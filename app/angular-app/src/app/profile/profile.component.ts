import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import {FormErrorHandlerService} from '../services/form-error-handler.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
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

  constructor(private http: OstHttp,
              private formErrorHandler: FormErrorHandlerService,
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
      this.http.post('api/admin/profile/change-password' , {...params }  ).subscribe(
        response => {
          let res = response.json();
          changePassword.isSubmitting = false;
          this.btnText = "Update Password";
          if( res.success ){
            $("#changePasswordSuccess").modal("show");
            changePassword.reset();
          }else{
            this.formErrorHandler.hadleError( changePassword ,  res );
          }
        },
        error => {
          let err = error.json();
          changePassword.isSubmitting = false;
          this.btnText = "Update Password";
          this.formErrorHandler.hadleError( changePassword ,  err );
        }
      )
    }
  }
  resetForm( changePassword){
    this.formErrorHandler.clearServerErrors( changePassword );
    changePassword.reset();
  }


  inputChanges(form){
    this.formErrorHandler.clearServerErrors(form);
  }

}
