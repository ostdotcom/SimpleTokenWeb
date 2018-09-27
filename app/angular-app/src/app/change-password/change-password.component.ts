import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  errorResponse;

  btnText     : string  = "Update Password";
  isSubmitting: boolean = false;

  constructor(private http: OstHttp) { }

  ngOnInit() {
  }

  changePasswordSubmit(changePassword) {
    let params =  changePassword.value;
    this.isSubmitting = true;
    this.btnText = "Updating...";
    this.errorResponse = null;
    if (changePassword.valid){
      this.http.post('api/admin/profile/change-password' , {...params }  ).subscribe(
        response => {
          let res = response.json();
          if( res.success ){
           this.onFormSubmitSuccess( res , changePassword);
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

  onFormSubmitSuccess( res , changePassword) {
    $("#changePasswordSuccess").modal("show");
    changePassword.reset();
    this.onFormSubmitComplete();
  }

  onFormSubmitError( error ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete(){
    this.isSubmitting = false;
    this.btnText      = "Update Password";
  }

  resetForm(){
    this.errorResponse = null;
  }


}
