import { Component, Input } from '@angular/core';

@Component({
  selector: 'ost-form-error-handler',
  templateUrl: './ost-form-error-handler.component.html',
  styleUrls: ['./ost-form-error-handler.component.scss']
})
export class OstFormErrorHandlerComponent {

  @Input("inputField") inputField;
  @Input("fieldName") fieldName = "This field";
  @Input("errorResponse") errorResponse;

  errorMessages = {"required": " is required",
                   "minlength": " minimum length is ",
                   "maxlength":  + " maximum length is "
                  };
  generalError : null;

  ngOnChanges( changes ){
    this.handleError();
  }

  getErrorMessage(){
    let errors =  this.inputField.errors;
    this.inputField["serverError"] = null;
    if( errors.required ){
     return  this.fieldName + this.errorMessages.required
    }else if( errors.minlength ){
      return this.fieldName + this.errorMessages.minlength + errors.minlength.requiredLength
    }else if( errors.maxlength){
      return this.fieldName + this.errorMessages.maxlength + errors.maxlength.requiredLength
    }else {
      return "Input is invalid."
    }
  }

  handleError(  ){
    let errorResponse = this.errorResponse,
        error         = errorResponse && errorResponse.err  ,
        error_data    = error && error.error_data ,
        inputName ,
        inputError
        ;
    if( this.inputField && this.isErrorData(error_data) ) {
      //If input and has error_data.
      inputName  = this.inputField.name;
      inputError = error_data[inputName];
      if( inputError ){
        this.inputField['serverError'] = inputError;
      }
    } else if( !this.inputField && error ){
      //If not input and has error means its general error.
      this.generalError = error && error["display_text"] ;
    } else {
      //Reset all errors.
      this.inputField['serverError'] = null;
      this.generalError = null;
    }
  }

  isErrorData( errorData ){
    let errorDataKeys = errorData && Object.keys(errorData),
        errorsLen = errorDataKeys && errorDataKeys.length
    ;
    return errorsLen && errorsLen > 0;
  }
}
