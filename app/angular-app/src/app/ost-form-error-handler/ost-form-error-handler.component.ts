import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'ost-form-error-handler',
  templateUrl: './ost-form-error-handler.component.html',
  styleUrls: ['./ost-form-error-handler.component.scss']
})
export class OstFormErrorHandlerComponent {

  @Input("errorFor") errorFor;
  @Input("fieldName") fieldName = "This field";
  @Input("serverError") serverError;

  errorDictionary = {
                   "required": " is required",
                   "minlength": " minimum length is ",
                   "maxlength": " maximum length is ",
                   "min"  : "min value is",
                   "max"  : "max value is"
                  };

  serverErrorMessage : string = null;

  ngOnChanges( ){
    this.handleServerError();
  }

  //This is just a library of error messages which will keep on adding.
  getFrontEndErrorMessage(){
    let errors =  this.errorFor['errors'];
    if( errors.required ){
     return  this.fieldName + this.errorDictionary.required
    }else if( errors.minlength ){
      return this.fieldName + this.errorDictionary.minlength + errors.minlength.requiredLength
    }else if( errors.maxlength){
      return this.fieldName + this.errorDictionary.maxlength + errors.maxlength.requiredLength
    }else {
      return "Input is invalid."
    }
  }

  handleServerError( ){
    let error = this.serverError && this.serverError.err
        ;
    if( this.errorFor && error ) {
      let inputName  = this.getName( ),
          inputError = this.getError( inputName , error );
      if( inputError ){
        this.serverErrorMessage = inputError;
      }
    }  else {
      this.serverErrorMessage = "";
    }
  }

  isFrontEndError(){
      return this.errorFor instanceof NgModel && this.errorFor.touched && !this.errorFor.valid ;
  }

  getName( ){
    if( this.errorFor instanceof NgModel ){
      return this.errorFor['name'];
    }else if( typeof this.errorFor == "string" ){
      return this.errorFor;
    }else{
      console.log("Name not found for error handler" , this.errorFor);
      return "no_name_found";
    }
  }

  getError( name , error ) {
    let errorData = error && error.error_data ;
    if( name == 'general_error'){
      return error && error["display_text"];
    }
    if( this.isErrorData( errorData ) ){
      return errorData[name];
    }
  }

  isErrorData( errorData ){
    let errorDataKeys = errorData && Object.keys(errorData),
        errorsLen = errorDataKeys && errorDataKeys.length
    ;
    return errorsLen && errorsLen > 0;
  }
}
