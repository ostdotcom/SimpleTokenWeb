import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {UtilitiesService} from "../services/utilities.service";
import {RequestParamEncoderService} from "../services/request-param-encoder.service";

declare var $:any;

@Component({
  selector: 'app-mfa-session-settings',
  templateUrl: './mfa-session-settings.component.html',
  styleUrls: ['./mfa-session-settings.component.scss']
})
export class MfaSessionSettingsComponent implements OnInit {

  hasError      : boolean = false;
  isProcessing  : boolean = true;
  errorMessage  : string  = null;

  btnText       : string  = "Apply";
  isSubmitting  : boolean = false;

  errorResponse : object = null;
  getDataURL    : string = 'api/admin/setting/get-mfa-session-settings';
  postDataURL    : string = 'api/admin/setting/update-mfa-session-settings';

  toggleLabel : string = 'ENABLE DIFFERENT SETTINGS FOR SUPER ADMINS';
  enableForSuperAdmin : number = 0;

  adminSessionTimeout : number = 1;
  adminMFAFrequency   : number = 1;
  sadminSessionTimeout: number = 1;
  sadminMFAFrequency  : number = 1;
  adminMFAType        : number = 0;
  sadminMFAType       : number = 0;

  mfaInputLabel : string = 'Days (1 - 14)';
  sessionInputLabel : string = 'Hours (1 - 3)';

  errorDictionaryConfig: object = {
    "customMin"  : "Please select a number within the range mentioned",
    "customMax"  : "Please select a number within the range mentioned"
  };

  constructor(private http: OstHttp,
              private stateHandler : RequestStateHandlerService,
              private utilities : UtilitiesService,
              private requestParamEncoder : RequestParamEncoderService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.http.get( this.getDataURL ).subscribe(
      response => {
        let res = response.json();
        if(res && res.success){
          let data = res.data || {} ;
          this.initData( data );
          this.stateHandler.updateRequestStatus(this, false,false,false, res);
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

  initData( data ){
    this.adminMFAType = this.utilities.deepGet( data , 'admin_setting.mfa_type');
    this.adminMFAFrequency = this.utilities.deepGet( data , 'admin_setting.mfa_frequency');
    this.adminSessionTimeout = this.utilities.deepGet( data , 'admin_setting.session_timeout');
    this.enableForSuperAdmin = this.utilities.deepGet( data , 'has_sa_setting');
    this.sadminMFAType = this.utilities.deepGet( data , 'super_admin_setting.mfa_type');
    this.sadminMFAFrequency = this.utilities.deepGet( data , 'super_admin_setting.mfa_frequency');
    this.sadminSessionTimeout = this.utilities.deepGet( data , 'super_admin_setting.session_timeout');
  }

  mfaSessionSettingsSubmit( mfaSessionSettings ) {
    if( this.isInValidInput() ) return;
    let params = mfaSessionSettings.value,
        encodedParams = this.requestParamEncoder.getEncodedPOSTParams( params );
    this.preFormSubmit();
    this.http.post(this.postDataURL, encodedParams ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.onFormSubmitSuccess( res );
        } else {
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

  preFormSubmit() {
    this.btnText = 'Applying...';
    this.isSubmitting = true;
    this.errorResponse = null;
  }

  onFormSubmitSuccess( res ){
    this.onFormSubmitComplete();
    $('#mfa-settings-success-modal').show();
  }

  onFormSubmitError( err ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete() {
    this.btnText = 'Apply';
    this.isSubmitting = false;
  }

  isInValidInput(){
   return !this.isValidMFAFrequency( this.adminMFAFrequency ) || !this.isValidSessionTimeout( this.adminSessionTimeout ) ||
     (this.enableForSuperAdmin && (!this.isValidMFAFrequency( this.sadminMFAFrequency ) || !this.isValidSessionTimeout( this.sadminSessionTimeout )))
  }

  isValidMFAFrequency( frequencyInDays ){
    return (frequencyInDays >= 1 && frequencyInDays <= 14);
  }

  isValidSessionTimeout( timeoutInHrs ){
    return (timeoutInHrs >= 1 && timeoutInHrs <= 3);
  }

}
