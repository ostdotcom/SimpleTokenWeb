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
       // this._defaultOptions.headers.set( 'X-CSRF-Token', csrf_token );
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
            .catch(this.handleError)
    }

    public handleError = (error: Response) => {
      let msg  = ''
      ;
      console.log("i am in overwritter", error);
      if (error.status === 0) {
        msg = 'Not able to connect to server. Please verify your internet connection.';
      } else if (error.status == 404) {
        msg = 'Requested page not found.';
      } else if (error.status == 500) {
        msg = 'Internal Server Error.';
      } else if (error.status == 401) {
        window.location.href = "/login";
      } else if (error.status == 408){
        msg = 'Time out error.';
      } else {
        msg = 'Unable to connect to server.';
      }

      return Observable.throw(error)
    }
}
