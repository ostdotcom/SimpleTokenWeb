import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import {AppConfigService} from "../services/app-config.service";

declare var $: any ;

@Component({
  selector: 'app-developers-integration',
  templateUrl: './developers-integration.component.html',
  styleUrls: ['./developers-integration.component.scss']
})
export class DevelopersIntegrationComponent implements OnInit {

  dataUrl   = "api/admin/setting/developer-details";
  apiKey    = "";
  apiSecret = "";

  hasError     : boolean = false;
  isProcessing : boolean = true;
  errorMessage : string;
  errorResponse;
  generateKeysErrorResponse;

  isSubmitting    : boolean = false;
  isGenerating    : boolean = false;
  generateBtnText : string  = "Generate new keys";
  btnText         : string  = "Apply";

  apiOptions               : Array<object>;
  apiSelectedOptions       : Array<string> = [];
  apiApplicableOptions     : Array<string> = [];
  cachedSelectedApiOptions : Array<string> = [];

  constructor(private http: OstHttp, private stateHandler: RequestStateHandlerService,
              public appConfig : AppConfigService ) { }

  ngOnInit() {
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip();
    },0);
    this.getIntegrationInfo();
  }

  getIntegrationInfo(){
    this.http.get(this.dataUrl).subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.apiKey                   = res.data.api_key;
          this.apiSecret                = res.data.api_secret;
          this.apiApplicableOptions     = res.data.applicable_api_fields || [];
          this.apiSelectedOptions       = res.data.selected_api_fields || [];
          this.apiOptions               = res.data.api_fields_config || [];
          this.apiOptions               = this.getFilteredOptions(this.apiOptions, this.apiApplicableOptions);
          this.cachedSelectedApiOptions = this.getObjectCopy(this.apiSelectedOptions );
          this.stateHandler.updateRequestStatus(this, false,false);
        } else{
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }

  generateApiKeys() {
    this.isGenerating   = true;
    this.generateBtnText = "Generating new keys...";
    this.http.post('api/admin/setting/reset-api-credentials' , { }  ).subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.apiKey    = res.data.api_key;
          this.apiSecret = res.data.api_secret;
          this.onGenerateSuccess( res );
        } else{
          this.onGenerateError( res );
        }
      },
      error => {
        let err = error.json();
        this.onGenerateError( err );
      })
  }

  onGenerateSuccess( res ) {
    $("#generate-keys-success-modal").modal("show");
    this.onGenerateComplete();
  }

  onGenerateError( err ) {
    this.generateKeysErrorResponse = err;
    this.onGenerateComplete();
  }

  onGenerateComplete(){
    this.isGenerating = false;
    this.generateBtnText = "Generate new keys";
  }

  showConfirmModal() {
    $("#generate-api-confirmation-modal").modal("show");
  }

  getFilteredOptions( apiOptions, applicableOptions) {

    if(applicableOptions.length == 0) return apiOptions;

    let filteredOptions = [];
    for(let i in apiOptions) {
      let option = apiOptions[i].value;
      if(applicableOptions.indexOf(option) != -1){
        filteredOptions.push(apiOptions[i]);
      }
    }
    return filteredOptions;
  }

  isChecked( value ){
    if( this.apiSelectedOptions.indexOf(value) > -1 ){
      return true;
    }else{
      return false;
    }
  }

  onChange( value ){
    let indexOf =  this.apiSelectedOptions.indexOf(value);
    if( indexOf > -1 ){
      this.apiSelectedOptions.splice( indexOf ,  1);
    }else{
      this.apiSelectedOptions.push( value );
    }
  }

  onCancel( ){
    let cachedOptions       = this.cachedSelectedApiOptions;
    this.apiSelectedOptions = this.getObjectCopy(cachedOptions);
  }

  submitForm(apiForm){
    let params = this.getParams();
    this.isSubmitting = true;
    this.btnText = "Applying...";
    this.errorResponse = null;
    if (apiForm.valid){
      this.http.post('api/admin/setting/update-api-fields' , {...params }  ).subscribe(
        response => {
          let res = response.json();
          if( res.success ){
           this.onFormSubmitSuccess( res );
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
  }

  onFormSubmitSuccess( res ) {
    $("#setting-apply-success-modal").modal("show");
    this.cachedSelectedApiOptions = this.getObjectCopy(this.apiSelectedOptions);
    this.onFormSubmitComplete();
  }

  onFormSubmitError( error ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete(){
    this.isSubmitting = false;
    this.btnText = "Apply";
  }

  getParams() {
    let params = {'set_allowed_keys' : this.apiSelectedOptions};
    return params;
  }

  getObjectCopy( object ){
    return JSON.parse(JSON.stringify(object));
  }
}
