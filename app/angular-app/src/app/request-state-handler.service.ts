import { Injectable } from '@angular/core';

@Injectable()
export class RequestStateHandlerService {

  constructor() { }

  updateRequestStatus(context, isProcessing: boolean = false,  hasError: boolean = false, hasWarning?:boolean,  error?: object ){
    if(!context) return;
    context.isProcessing = isProcessing ;
    context.hasError = hasError;
    context.hasWarning = hasWarning;
    if( error ){
      let err = error['err'];
      context.errorMessage = err && err['display_text'] ;
    }
  }

}
