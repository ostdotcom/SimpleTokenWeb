import { Injectable } from '@angular/core';

@Injectable()
export class FormErrorHandlerService {

  constructor() {}

  hadleError( form , response ){
    let error         = response && response.err  ,
        error_data    = error && error.error_data ,
        serverErrors  = null;
        ;
    if( this.isErrorData(error_data) ) {
      form.controls[Object.keys(error_data)[0]]['serverError'] = Object.values(error_data)[0];

    } else{
      form.controls["general_error"]["serverError"] = error && error["display_text"];
    }
  }

  clearServerErrors( form  ){
    for (let key in form.controls){
      form.controls[key]["serverError"] = null;
    }
  }

  isErrorData( errorData ){
    let errorDataKeys = errorData && Object.keys(errorData),
        errorsLen = errorDataKeys && errorDataKeys.length
    ;
    return errorsLen && errorsLen > 0;
  }
}
