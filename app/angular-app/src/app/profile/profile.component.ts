import { Component, OnInit, ViewChild } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';

import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { OstFormErrorHandlerComponent } from '../ost-form-error-handler/ost-form-error-handler.component';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  clientName: string = "";
  domainName: string = "";
  superAdminEmails: Array<string> = [""];
  dataUrl = "api/admin/client/profile";
  hasError: boolean =false;
  message: string;
  btnText: string = "Update Password";
  hasLoaded =false;
  errorMessage: string;
  errorResponse;

  @ViewChild(OstFormErrorHandlerComponent) formErrorHandler:OstFormErrorHandlerComponent;

  constructor(private http: OstHttp,

              private stateHandler : RequestStateHandlerService) { }

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo(){
    this.http.get(this.dataUrl).subscribe(
      response => {
        let res = response.json();
        this.hasLoaded = true;
        if(res.success){
          this.clientName = res.data.name;
          this.domainName = res.data.domain_name;
          this.superAdminEmails = res.data.super_admin_email_ids;
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

  changePasswordSubmit(changePassword) {
    let params =  changePassword.value;
    changePassword.isSubmitting = true;
    this.btnText = "Updating...";
    if (changePassword.valid){
      this.http.post('api/admin/profile/change-password1' , {...params }  ).subscribe(
        response => {
          let res = response.json();
          changePassword.isSubmitting = false;
          this.btnText = "Update Password";
          if( res.success ){
            $("#changePasswordSuccess").modal("show");
            changePassword.reset();
          }else{
            this.errorResponse = res;
            this.formErrorHandler.handleError( res );
          }
        },
        error => {
          let err = error.json();
          changePassword.isSubmitting = false;
          this.btnText = "Update Password";
          this.errorResponse = err;
          this.formErrorHandler.handleError(err);
        }
      )
    }
  }
  resetForm( changePassword){
    this.formErrorHandler.clearServerErrors( );
    changePassword.reset();
  }


  inputChanges(form){
    this.formErrorHandler.clearServerErrors();
  }

}
