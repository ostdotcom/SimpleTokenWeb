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
      serverErrors = error_data
    }else{
      serverErrors = {};
      serverErrors["general_error"] = error && error["display_text"];
    }
    form["serverErrors"] = serverErrors ;
  }

  clearServerErrors( form  ){
    form["serverErrors"] = null;
  }

  isErrorData( errorData ){
    let errorDataKeys = errorData && Object.keys(errorData),
        errorsLen = errorDataKeys && errorDataKeys.length
    ;
    return errorsLen && errorsLen > 0;
  }
}
