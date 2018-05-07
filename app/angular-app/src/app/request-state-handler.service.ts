import { Injectable } from '@angular/core';

@Injectable()
export class RequestStateHandlerService {

  constructor() { }

  updateRequestStatus(context, isProcessing: boolean,  hasError: boolean, hasWarning?:boolean,  error?: object ){
    if(!context) return;
    context.isProcessing = isProcessing ;
    context.hasError = hasError;
    context.hasWarning = hasWarning;
    if( error ){
      context.errMsg =  error['err'] && error['err']['display_text'] ;
    }
  }

}
