import { Component, OnInit} from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { AppConfigService } from '../services/app-config.service'

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

  isSuperAdmin  : boolean = false;

  startHour     : string  = "";
  startMin      : string  = "";
  endHour       : string  = "";
  endMin        : string  = "";
  startDate     : string  = null;
  endDate       : string  = null;

  saleStartDateError  : string = null;
  saleEndDateError    : string = null;

  btnText : string = "Apply";

  isSubmitting : boolean = false;

  previous = {
    startHour : null,
    startMin  : null,
    endHour   : null,
    endMin    : null
  };

  constructor(private http: OstHttp,
              private stateHandler : RequestStateHandlerService,
              public appConfig : AppConfigService ) {
  }

  ngOnInit() {
    this.initSaleSettingsForm();
    this.isSuperAdmin = this.appConfig.isSuperAdmin();
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
    formattedDate =  date + separator + month + separator + year;
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

    $('.saleStartDate').on('change blur' , function (e) {
      oThis.startDate = e.target.value ;
      console.log("date changed" + e.target.value);
    });

    $('.saleEndDate').on('change blur', function(e) {
      oThis.endDate = e.target.value ;
    });
  }

  getDatePickerConfig( date  ) {
    let config = {
      format: 'dd-mm-yyyy',
      autoclose: true,
      clearBtn: true,
      startDate: date,
      defaultViewDate: date,
      orientation: 'bottom left'
    };
    return config;
  }

  submitSaleSettingsForm(saleSettings) {
    this.saleEndDateError   =  null ;
    this.saleStartDateError = null;
    if( saleSettings.invalid ) {
      this.showFormInputErrors( saleSettings );
      return false ;
    }
    let params = this.getParams( );
    this.btnText = "Applying...";
    this.isSubmitting = true;
    this.http.post('api/admin/client/update-sale-setting' , {...params }  ).subscribe(
      response => {
        let res = response.json();
        if( res.success ){
          this.onFormSubmitSuccess( res  );
        }else{
          this.errorResponse = res;
          this.onFormSubmitError( res );
        }
      },
      error => {
        let err = error.json();
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
    this.errorResponse = null;
    this.saleEndDateError   = null;
    this.saleStartDateError = null;
    $('#sale-setting-success-modal').modal('show');
    this.onFormSubmitComplete();
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
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete() {
    this.btnText = "Apply";
    this.isSubmitting = false;
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
    let seperator = ":",
        second    = sec || "00"
    ;
    return hour + seperator + min + seperator + second;
  }

  getTimeStamp(date, time, timeFormat? ) {
    let spacer = " ",
        format = timeFormat || "UTC",
        formattedDate
    ;
    if( date && typeof date == "string") {
      let splitedDate = date.split("-");
      if( splitedDate[0].length != 4 ) {
        date = splitedDate.reverse().join('-');
      }
    }

    formattedDate = date + spacer + time + spacer + format ;
    return Date.parse( formattedDate );
  }

  validate( event , modalName ) {
    var allowedKeys = [8, 37, 38, 39, 40, 46];
    if (allowedKeys.indexOf(event.keyCode) != -1) return true;
    let targetEl  = event.target ,
        newVal    = targetEl.value,
        inputVal  = parseInt( newVal ),
        min       = parseInt( targetEl.min ) || 0 ,
        max       = parseInt( targetEl.max ),
        isValid   = true
    ;
    if( !isNaN( inputVal ) && inputVal < min || ( max && inputVal > max ) || newVal.length > 2 ){
      isValid         = false ;
      this[modalName] = this['previous'][modalName];
      targetEl.value  = this['previous'][modalName];
    }else{
      this['previous'][modalName] = inputVal ;
    }

    if( isValid && newVal.length == 2 ){  //Just to focus out.
      let nextElement = $( targetEl ).next().next();
      if (nextElement.length) {
        nextElement[0].focus();
      }
    }
  }

  updateValueOnBlur( event , modalName ) {
    if( !event.target.value ) return ;
    let newVal      = parseInt( this[ modalName ] ) ,
        inputVal    = this.getNormalizedValue( newVal )
    ;
    this[modalName]             = inputVal;
    event.target.value          = inputVal;
    this['previous'][modalName] = inputVal;
  }

}
