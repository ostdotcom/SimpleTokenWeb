import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {UtilitiesService} from "../services/utilities.service";

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
  cachedAdminMFAFrequency : number = 0;

  mfaInputLabel : string = 'Days (1 - 14)';
  sessionInputLabel : string = 'Hours (1 - 3)';

  errorMsgConfig: object = {
    "min"  : "Please select a number within the range mentioned",
    "max"  : "Please select a number within the range mentioned"
  };

  data = {};

  constructor(private http: OstHttp,
              private stateHandler : RequestStateHandlerService,
              private utilities : UtilitiesService) { }

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
          this.onDataSuccess(  data );
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

  onDataSuccess( data ){
    console.log("enableForSuperAdmin" , this.enableForSuperAdmin);
    if( this.enableForSuperAdmin == 1  ){
      setTimeout( ()=> {
        $('#superAdminSettings').show();
      });
    }
  }

  initData( data ){
    this.data = data ;
    this.adminMFAType = this.utilities.deepGet( data , 'admin_setting.mfa_type') || 0;
    this.adminMFAFrequency = this.utilities.deepGet( data , 'admin_setting.mfa_frequency') || 1;
    this.adminSessionTimeout = this.utilities.deepGet( data , 'admin_setting.session_timeout') || 1;
    this.enableForSuperAdmin = this.utilities.deepGet( data , 'has_sa_setting') || 0;
    this.sadminMFAType = this.utilities.deepGet( data , 'super_admin_setting.mfa_type') || 0;
    this.sadminMFAFrequency = this.utilities.deepGet( data , 'super_admin_setting.mfa_frequency') || 1;
    this.sadminSessionTimeout = this.utilities.deepGet( data , 'super_admin_setting.session_timeout') || 1;
  }

  mfaSessionSettingsSubmit( mfaSessionSettings ) {
    if( !mfaSessionSettings.valid ) return;
    let params = mfaSessionSettings.value,
        encodedParams = this.http.getEncodedPOSTParams( params );
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
    $('#mfa-settings-success-modal').modal('show');
  }

  onFormSubmitError( err ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete() {
    this.btnText = 'Apply';
    this.isSubmitting = false;
  }

  onAdminMfaFrequencyTypeClick(){
    this.adminMFAFrequency = this.utilities.deepGet( this.data , 'admin_setting.mfa_frequency') || 1 ;
  }

  onSuperAdminToggle( ){
    if( this.enableForSuperAdmin == 0 ){
      this.resetSuperAdminValues();
    }
    this.showHideSuperAdminSection(  );
  }

  resetSuperAdminValues(){
    this.sadminMFAType = this.utilities.deepGet( this.data , 'super_admin_setting.mfa_type') || 0;
    this.sadminMFAFrequency = this.utilities.deepGet( this.data , 'super_admin_setting.mfa_frequency') || 1;
    this.sadminSessionTimeout = this.utilities.deepGet( this.data , 'super_admin_setting.session_timeout') || 1;
  }

  showHideSuperAdminSection(  ){
    if( this.enableForSuperAdmin == 1  ){
      $('#superAdminSettings').slideDown();
    }else {
      $('#superAdminSettings').slideUp();
    }
  }

}
