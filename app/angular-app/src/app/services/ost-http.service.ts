import {Http, Request, RequestOptions, RequestOptionsArgs, Response, URLSearchParams, XHRBackend} from "@angular/http"
import {Injectable} from "@angular/core"
import {Observable} from "rxjs/Rx"

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

//meta read operator
import {Meta} from '@angular/platform-browser';

@Injectable()
export class OstHttp extends Http {

  customEncoder = null ;

  constructor(
    backend: XHRBackend,
    options: RequestOptions,
    public http: Http,
    meta?: Meta
  ) {
    super(backend, options);
    let csrf_token = meta.getTag('name=csrf-token').content;
    this._defaultOptions.headers.set('X-CSRF-Token', csrf_token);
    this.customEncoder = new CustomEncoder();
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch(this.handleError);
  }

  getEncodedGETParams( requestParams ) {
    let options = requestParams || {};
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

  getEncodedPOSTParams( requestParams ) {
    let body = requestParams || {};
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

  public getNextParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    //gives decoded string
    const r_m = urlParams.get('r_m');
    if (r_m == "1") {
      return ("?next=" + encodeURIComponent(window.location.pathname + window.location.search));
    } else {
      return "";
    }
  }

  public handleError = (error: Response) => {
    let erroMsg = null;
    if (error.status === 0) {
      erroMsg = 'Not able to connect to server. Please verify your internet connection.';
    } else if (error.status == 404) {
      erroMsg = 'Requested page not found.';
    } else if (error.status == 500) {
      erroMsg = 'Internal Server Error.';
    } else if (error.status == 401) {
      //  do not use query paramters in status401redirect url
      window.location.href = "/admin/login" + this.getNextParameter();
    } else if (error.status == 302) {
      var redirect_url;
      erroMsg = 'Redirecting..';
      try {
        let _body = JSON.parse(error['_body']) || {},
          _err = _body['err'] || {},
          error_extra_info = _err['error_extra_info'] || {};
        redirect_url = error_extra_info['redirect_url'];
      } catch (e) {
        redirect_url = '/admin/login';
      }
      window.location.href = redirect_url;
    } else if (error.status == 408) {
      erroMsg = 'Time out error.';
    } else {
      erroMsg = "Unable to connect to server";
    }
    if (erroMsg) {
      let _body = error['_body'] || {};
      try {
        _body = JSON.parse(_body);
      } catch (e) {
        _body = {};
      }
      if (!_body['err']) {
        _body['err'] = {};
      }
      _body['err']['display_text'] = erroMsg;
      error['_body'] = JSON.stringify(_body);
    }


    return Observable.throw(error);
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
