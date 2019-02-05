import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {UtilitiesService} from "../services/utilities.service";

declare var $:any;

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit {

  hasError     : boolean = false;
  isProcessing : boolean = true;
  errorMessage : string;

  btnText       : string  = "Apply";
  isSubmitting  : boolean = false;
  errorResponse;

  postData : Object = {};
  sectionList: Array<Object> = [];
  adminList : Object = {};
  modified : boolean = false;

  dataURL : string = "api/admin/setting/email-notification";

  constructor(private http: OstHttp,
              private stateHandler: RequestStateHandlerService,
              private utilities : UtilitiesService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.http.get( this.dataURL ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.sectionList = this.utilities.deepGet(res, 'data.section');
          this.adminList = this.utilities.deepGet(res, 'data.admins');
          this.stateHandler.updateRequestStatus(this, false, false);
        } else {
          this.stateHandler.updateRequestStatus(this, false, true, false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false, true, false, err);
      })
  }

  submitForm(){
    let params = {
      email_setting : this.postData
    };
    this.preFormSubmit();
    this.http.post( this.dataURL , params ).subscribe(
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
    $('#email-notification-success-modal').modal('show');
  }

  onFormSubmitError( err ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete() {
    this.btnText = 'Apply';
    this.isSubmitting = false;
    this.modified = false;
  }

  isModified(){
    return this.modified;
  }

  setModified( value ){
    this.modified = value;
  }



}
