import { Component } from '@angular/core';
import { Http , BaseRequestOptions} from '@angular/http';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor( private http : Http  , private meta: Meta ) {
    new RequestHeaders( http , meta );
  }
}

class RequestHeaders extends BaseRequestOptions {
  constructor( private http ,  private meta ){
    super();
    let csrf_token = meta.getTag('name=csrf-token').content;
    http._defaultOptions.headers.set( 'X-CSRF-Token', csrf_token ); 
  }
}






//Test code start
function testCsrfAddition( http ){
  http.get("api/admin/kyc/dashboard").subscribe( 
    response => {
      console.log("response"  , response); 
    },  
    error => {
      console.log("error" , error); 
    })
}
//Test code end