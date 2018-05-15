import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

//meta read operator
import { Meta } from '@angular/platform-browser';

@Injectable()
export class OstHttp extends Http {

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        meta?: Meta
    ) {
        super(backend, options);
        let csrf_token = meta.getTag('name=csrf-token').content;
        this._defaultOptions.headers.set( 'X-CSRF-Token', csrf_token );
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
               .catch(this.handleError);
    }

    public handleError = (error: Response) => {
      let  erroMsg = null ;

      if (error.status === 0) {
        erroMsg = 'Not able to connect to server. Please verify your internet connection.';
      } else if (error.status == 404) {
        erroMsg = 'Requested page not found.';
      } else if (error.status == 500) {
        erroMsg = 'Internal Server Error.';
      } else if (error.status == 401) {
        window.location.href = "admin/login";
      } else if (error.status == 408){
        erroMsg = 'Time out error.';
      }else {
        erroMsg = "Unable to connect to server";
      }


        if( erroMsg ) {
          let _body =  error['_body'] || {};
          try {
            _body = JSON.parse(_body);
          }catch (e){
            _body = {};
          }
          if( !_body['err'] ){
            _body['err'] = {};
          }
          _body['err']['display_text'] = erroMsg;
          error['_body'] = JSON.stringify(_body);
      }



      return Observable.throw(error);
    }
}
