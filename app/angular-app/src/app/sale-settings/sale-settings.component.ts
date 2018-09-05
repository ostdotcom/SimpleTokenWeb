import { Component, OnInit} from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

import {FormsModule} from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-sale-settings',
  templateUrl: './sale-settings.component.html',
  styleUrls: ['./sale-settings.component.scss']
})
export class SaleSettingsComponent implements OnInit {
  errorResponse = null;
  hasError: boolean =false;
  isProcessing: boolean =false;
  errorMessage: string;
  startHour : string;
  startMin : string;
  startDatePostfix : string;
  endHour : string;
  endMin : string;
  endDatePostfix : string;
  startDate : string;
  endDate : string;

  constructor(private http: OstHttp,

              private stateHandler : RequestStateHandlerService) {

    this.startHour = '3';
    this.startMin = '30';
    this.startDatePostfix = 'AM';
    this.endDatePostfix = 'AM';
    this.endHour = '5';
    this.endMin = '55';
    this.startDate = '2018-09-26';
    this.endDate ='2018-09-30';
  }

  ngOnInit() {
    let context = this;
    //this.initSaleSettingsForm();
    setTimeout(function(){
      context.initDatePicker();
    }, 0);
  }


  initSaleSettingsForm() {
    this.http.get('api/admin/client/get-sale-setting').subscribe(
      response => {
        let res = response.json();
        if(res.success){
          console.log("success");
          this.stateHandler.updateRequestStatus(this, false,false);
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

  initDatePicker() {
    let context = this,
        config = this.getDatePickerConfig(this.startDate);
    $('.saleStartDate').datepicker(config);
    config = this.getDatePickerConfig(this.endDate);
    $('.saleEndDate').datepicker(config);

    $('.saleStartDate, .saleEndDate').on('show' , function (e) {
      e.stopPropagation();
    });

    $('.saleStartDate').on('changeDate' , function (e) {
      context.updateStartDate(e.target.value);
    });

    $('.saleEndDate').on('changeDate' , function (e) {
      context.updateEndDate(e.target.value);
    });
  }

  getDatePickerConfig(defaultDate) {
    let config = {
      format: 'yyyy-mm-dd',
      autoclose: true,
      clearBtn: true,
      startDate: this.getCurrentFormattedDate(),
      defaultViewDate: defaultDate
    }
    return config;
  }

  updateStartDate( value ){
    this.startDate  = value;
  }

  updateEndDate( value ){
    this.endDate  = value;
  }

  submitSaleSettingsForm(saleSettings) {
    let params =  this.getParams(saleSettings.value);
    this.http.post('api/admin/client/update-sale-setting' , {...params }  ).subscribe(
      response => {
        let res = response.json();
        if( res.success ){
          console.log("success");
        }else{
          this.errorResponse = res;
        }
      },
      error => {
        let err = error.json();
        this.errorResponse = err;
      }
    )
  }


  getParams(formValues) {
    let params,
        startDateTime = formValues.startDateTime,
        endDateTime = formValues.endDateTime;
    params = {
      'sale_start_timestamp' : this.getTimeStamp(startDateTime.startDate, this.getTime(startDateTime.startHour, startDateTime.startMin, startDateTime.startDatePostfix)),
      'sale_end_timestamp'   : this.getTimeStamp(endDateTime.endDate, this.getTime(endDateTime.endHour, endDateTime.endMin, endDateTime.endDatePostfix))
    }
    return params;
  }

  getTime(hour, min, postfix) {
    return hour+':'+min+':00'+postfix;
  }

  getTimeStamp(date, time) {
    let formattedDate = date+'T'+time;
    return Date.parse(formattedDate);
  }

  getCurrentFormattedDate() {
  let currentDate = new Date(),
      date,
      month;

  if(currentDate.getDate()<10){
    date ='0'+currentDate.getDate().toString();
  }
  if(currentDate.getMonth()<10){
    month ='0'+(currentDate.getMonth()+1).toString();
  }
  return currentDate.getFullYear().toString()+'-'+month+'-'+date;
  }

  validate(event){
    if( event.key != 'Backspace' ){
      let newVal = event.target.value + event.key,
          inputVal = parseInt( newVal ),
          min = parseInt(event.target.min),
          max = parseInt(event.target.max);
      if(inputVal < min || inputVal > max || (typeof inputVal == 'number' && newVal.length > 2)){
        event.preventDefault();
      }
      if(event.target.value.length == 2){
        let nextElement = $(event.target).next().next();

        if (nextElement.length) {
          nextElement[0].focus();
        }
      }
    }
  }

}
