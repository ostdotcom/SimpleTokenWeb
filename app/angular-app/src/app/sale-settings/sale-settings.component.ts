import { Component, OnInit} from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

import {FormsModule} from '@angular/forms';
import { endTimeRange } from '../../../node_modules/@angular/core/src/profile/wtf_impl';

declare var $:any;

@Component({
  selector: 'app-sale-settings',
  templateUrl: './sale-settings.component.html',
  styleUrls: ['./sale-settings.component.scss']
})
export class SaleSettingsComponent implements OnInit {

  hasError      : boolean = false;
  isProcessing  : boolean = true;
  errorMessage  : string  = null;

  errorResponse : object  = null;

  startHour     : string  = null;
  startMin      : string  = null;
  endHour       : string  = null;
  endMin        : string  = null;
  startDate     : string  = null;
  endDate       : string  = null;
  
  saleStartDateError  : string = null;
  saleEndDateError    : string = null;  

  btnText : string = "Apply"; 

  previous = {
    startHour : null,
    startMin  : null,
    endHour   : null,
    endMin    : null
  };

  constructor(private http: OstHttp,
              private stateHandler : RequestStateHandlerService) {
  }

  ngOnInit() {
    this.initSaleSettingsForm();
  }

  initSaleSettingsForm() {
    this.http.get('api/admin/client/get-sale-setting').subscribe(
      response => {
        let res   = response.json(), 
            data  = res.data
        ;
        if(res.success){
          this.updateDateTimeValues( data.sale_start_timestamp, data.sale_end_timestamp );
          this.stateHandler.updateRequestStatus(this,false,false);
        }
        else{
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }

  updateDateTimeValues( saleStartTimestamp  , saleEndTimestamp  ){
    let startDateObj = saleStartTimestamp && new Date(saleStartTimestamp ) ,
        endDateObj   = saleEndTimestamp && new Date(saleEndTimestamp ) 
    ; 
    if( startDateObj ){
      this.startDate  = this.getFormattedDate( startDateObj );
      this.startHour  = this.getNormalizedValue( startDateObj.getUTCHours() );
      this.startMin   = this.getNormalizedValue( startDateObj.getUTCMinutes() );

      //Store it for edit invalid update
      this.previous['startHour']  = this.startHour;
      this.previous['startMin']   = this.startMin;
    }

    if( endDateObj ){
      this.endDate  = endDateObj && this.getFormattedDate( endDateObj );
      this.endHour  = this.getNormalizedValue( endDateObj.getUTCHours() );
      this.endMin   = this.getNormalizedValue( endDateObj.getUTCMinutes() );

      //Store it for edit invalid update
      this.previous['endHour']  = this.endHour ;
      this.previous['endMin']   = this.endMin ; 
    }

    setTimeout( () => {
      this.initDatePicker();
    })
  }

  getNormalizedValue (value ){
    if( value < 10 ){
      return "0"+value ;
    }
    return value ; 
  }

  getFormattedDate( dateObj ) {
    let year  = dateObj.getUTCFullYear(),
        month = this.getNormalizedValue( dateObj.getUTCMonth() + 1  ) , 
        date  = this.getNormalizedValue( dateObj.getUTCDate() ),
        separator = "-" , 
        formattedDate = ""
        ;
    formattedDate =  year + separator + month + separator + date;
    return formattedDate;
  }

  initDatePicker() {
    let oThis = this,
        startDateConfig = this.getDatePickerConfig( this.startDate ),
        endDateConfig   = this.getDatePickerConfig( this.endDate )
    ;
    $('.saleStartDate').datepicker( startDateConfig );
    $('.saleEndDate').datepicker( endDateConfig );

    $('.saleStartDate, .saleEndDate').on('show' , function (e) {
      e.stopPropagation();
    });

    $('.saleStartDate').on('changeDate' , function (e) {
      oThis.startDate = e.target.value ;
    });

    $('.saleEndDate').on('changeDate' , function (e) {
      oThis.endDate = e.target.value;
    });
  }

  getDatePickerConfig( date  ) {
    let config = {
      format: 'yyyy-mm-dd',
      autoclose: true,
      clearBtn: true,
      startDate: date ,
      defaultViewDate: date
    }
    return config;
  }

  submitSaleSettingsForm(saleSettings) {
    if( saleSettings.invalid ) {
      this.showFormInputErrors( saleSettings ); 
      return false ; 
    }else{
      this.saleEndDateError   =  null ; 
      this.saleStartDateError = null; 
    }

    let params = this.getParams( );
    this.btnText = "Applying"; 
    this.http.post('api/admin/client/update-sale-setting' , {...params }  ).subscribe(
      response => {
        let res = response.json();
        this.btnText = "Apply"; 
        if( res.success ){
          this.onFormSubmitSuccess( res  ); 
        }else{
          this.errorResponse = res;
          this.onFormSubmitError( res ); 
        }
      },
      error => {
        let err = error.json();
        this.btnText = "Apply"; 
        this.errorResponse = err;
        this.onFormSubmitError( err ); 
      }
    )
  }

  showFormInputErrors( saleSettings ) {
    let controls      = saleSettings['controls'],
        endDateTime   = controls.endDateTime, 
        startDateTime = controls.startDateTime
    ;
    if( endDateTime.invalid ){
      this.saleEndDateError = "Please enter a valid date & time."
    }
    if( startDateTime.invalid ){
      this.saleStartDateError = "Please enter a valid date & time."
    }
  }

  onFormSubmitSuccess( res ){
    this.saleEndDateError   = null; 
    this.saleStartDateError = null; 
    $('#sale-setting-success-modal').modal('show'); 
  }

  onFormSubmitError( error ) {
    let err       = error.err,
        errorData = err['error_data'],
        saleStartDateError  = errorData && errorData['sale_start_timestamp'],
        saleEndDateError    = errorData && errorData['sale_end_timestamp']
    ; 
    if( saleStartDateError ){
      this.saleStartDateError = saleStartDateError ; 
    }

    if( saleEndDateError ){
      this.saleEndDateError = saleEndDateError ; 
    }
  }

  getParams( ) {
    let startTime     = this.getTime( this.startHour, this.startMin), 
        endTime       = this.getTime( this.endHour , this.endMin  ),
        startDateTime = this.getTimeStamp( this.startDate , startTime ), 
        endDateTime   = this.getTimeStamp( this.endDate , endTime),
        params
        ;
    params = {
      'sale_start_timestamp' : startDateTime,
      'sale_end_timestamp'   : endDateTime
    }
    return params;
  }

  getTime(hour, min , sec?) {
    let seprator = ":", 
        spacer   = " ",
        milSec   = sec || "00" 
    ;
    return hour + seprator + min + seprator + milSec;
  }

  getTimeStamp(date, time, timeFormate? ) {
    let spacer = " ",
        format = timeFormate || "UTC",
        formattedDate = date + spacer + time + spacer + format ;
    return Date.parse( formattedDate );
  }

  validate( event , modalName ) {
    var allowedKeys = [8, 37, 38, 39, 40, 46];
    if (allowedKeys.indexOf(event.keyCode) != -1) return true;
    let targetEl  = event.target , 
        newVal    = targetEl.value ,
        inputVal  = parseInt( newVal ),
        min       = parseInt( targetEl.min ) || 0 ,
        max       = parseInt( targetEl.max )
    ;
    if( inputVal < min || ( max && inputVal > max ) || newVal.length > 2 ){
      targetEl.value = this['previous'][modalName];
    }else{
      this['previous'][modalName] = inputVal ; 
    }
    if( newVal.length == 2 ){
      let nextElement = $( targetEl ).next().next();
      if (nextElement.length) {
        nextElement[0].focus();
      }
    }
  }

}
