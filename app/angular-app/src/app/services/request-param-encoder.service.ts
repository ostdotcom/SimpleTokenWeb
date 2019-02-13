import { Injectable } from '@angular/core';
import { RequestOptionsArgs, URLSearchParams } from "@angular/http"

@Injectable()
export class RequestParamEncoderService {

  customEncoder : CustomEncoder;

  constructor() {
    this.customEncoder = new CustomEncoder();
  }

  getEncodedGETParams( options?: RequestOptionsArgs ) {
    if( options &&  options['params']) {
      let params : any = options['params'],
        finalParams =  new URLSearchParams("" , this.customEncoder );
      ;
      for ( var pKey in params ) {
        if (!( params.hasOwnProperty( pKey ) ) ) { continue; }
        finalParams.set( pKey, params[ pKey ] );
      }
      options['params'] = finalParams;
    }
    return options;
  }

  getEncodedPOSTParams( body ) {
    if( body ) {
      let finalBody =  new URLSearchParams("" , this.customEncoder );
      for ( var pKey in body ) {
        if (!( body.hasOwnProperty( pKey ) ) ) { continue; }
        finalBody.set( pKey, body[ pKey ] );
      }
      body = finalBody;
    }
    return body;
  }

}

class CustomEncoder {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

