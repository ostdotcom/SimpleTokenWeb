import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ost-form-error-handler',
  templateUrl: './ost-form-error-handler.component.html',
  styleUrls: ['./ost-form-error-handler.component.scss']
})
export class OstFormErrorHandlerComponent implements OnInit {

  @Input("inputField") inputField;
  @Input("form") form;
  @Input("fieldName") fieldName = "This field";
  @Input("errorResponse") errorResponse;


  errorMessages = {"required": " is required",
                   "minlength": " minimum length is ",
                   "maxlength":  + " maximum length is "
                  }

  constructor() { }

  ngOnInit() {

  }

  getErrorMessage(){
    let errors =  this.inputField.errors;
    if( errors.required ){
     return  this.fieldName + this.errorMessages.required
    }else if( errors.minlength ){
      return this.fieldName + this.errorMessages.minlength + errors.minlength.requiredLength
    }else if( errors.maxlength){
      return this.fieldName + this.errorMessages.maxlength + errors.maxlength.requiredLength
    }
  }

  handleError( errorResponse ){
    let error         = errorResponse && errorResponse.err  ,
        error_data    = error && error.error_data ,
        serverErrors  = null;
        ;
    if( this.isErrorData(error_data) ) {
      this.form.controls[Object.keys(error_data)[0]]['serverError'] = Object.values(error_data)[0];

    } else{
      this.form.controls["general_error"] = {};
      this.form.controls["general_error"]["serverError"] = error && error["display_text"];
    }
  }

  clearServerErrors(){
    for (let key in this.form.controls){
      this.form.controls[key]["serverError"] = null;
    }
  }

  isErrorData( errorData ){
    let errorDataKeys = errorData && Object.keys(errorData),
        errorsLen = errorDataKeys && errorDataKeys.length
    ;
    return errorsLen && errorsLen > 0;
  }

}
