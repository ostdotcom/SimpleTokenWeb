import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RequestStateHandlerService} from "../../services/request-state-handler.service";
import {OstHttp} from "../../services/ost-http.service";
import {AppConfigService} from "../../services/app-config.service";
import {UtilitiesService} from "../../services/utilities.service";

declare var $: any;

@Component({
  selector: 'verify-otp-modal',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit{

  @Input('context') context: object;

  @Output() serverError = new EventEmitter<object>();

  errorMessage : string  = null;
  isProcessing : boolean = false;
  hasError     : boolean = false;
  errorResponse: object = null;

  otp       : number  = null;
  isSuccess : boolean = false;

  constructor( public appConfig: AppConfigService,
               public utilities: UtilitiesService,
               private http: OstHttp,
               private stateHandler: RequestStateHandlerService ) { }

  ngOnInit() {
    $("#verifyOTPPopup").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isSuccess     = false;
      this.otp           = null;
      this.errorResponse = null;
    });
  }

  validateOTP() {
    let context    = this.context,
        form       = context['form'],
        formValues = form.value,
        url        = context['url'],
        params     = this.getParams(formValues);
    this.errorResponse = null;
    this.isProcessing  = true;
    if (form.valid){
      this.http.post( url , { ...params }  ).subscribe(
        response => {
          let res = response.json();
          if( res.success ){
            this.serverError.emit(res);
            this.stateHandler.updateRequestStatus(this, false,false);
            this.onSuccess( res );
          }else{
            this.errorResponse = res;
            this.serverError.emit(res);
            this.stateHandler.updateRequestStatus(this, false,true,false, res);
            this.onError( res );
          }
        },
        error => {
          let err = error.json();
          this.errorResponse = err;
          this.serverError.emit(err);
          this.stateHandler.updateRequestStatus(this, false,true, false, err);
          this.onError( err );
        }
      )
    }
  }

  onSuccess( res ) {
    this.isSuccess = true;
    this.onComplete();
  }

  onError( error ) {
    this.onComplete();
  }

  onComplete() {
  }

  getParams( formValues ) {
    let params = $.extend({},formValues);
    params.otp = this.otp;
    return params;
  }

  isDisabled(){
    return this.otp == undefined || this.isProcessing ;
  }

}
