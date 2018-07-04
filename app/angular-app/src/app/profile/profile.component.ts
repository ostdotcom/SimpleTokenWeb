import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
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

  constructor(private http: OstHttp) { }

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo(){
    this.http.get(this.dataUrl).subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.clientName = res.data.name;
          this.domainName = res.data.domain_name;
          this.superAdminEmails = res.data.super_admin_email_ids;

        }
      },
      error => {
        let err = error.json();
        console.log(error);
      })
  }

  changePasswordSubmit(changePassword){
    let params =  changePassword.value;
    this.formReset( changePassword );
    if (changePassword.valid){
      this.http.post('api/admin/profile/change-password' , {...params }  ).subscribe(
        response => {
          let res = response.json();
          console.log(res);
          $("#changePasswordModal").modal("show");
          if( res.success ){
            $("#changePasswordSuccess").modal("show");
          }else{
            this.formSubmitErrorHandler( changePassword ,  res );
          }
        },
        error => {
          let err = error.json();
          this.formSubmitErrorHandler( changePassword ,  err );
        }
      )
    }
  }

  formSubmitErrorHandler( form , response  ){
    let error     = response && response.err  ,
        error_data = error && error.error_data
        ;
    console.log("errorData--", error_data);
    if( error_data ) {
      form['error_data'] = error_data
    }
  }

  formReset( form ){
    form['error_data'] = null;
  }



  resetForm( changePassword){
    this.formReset( changePassword );
    changePassword.reset();
  }

}
