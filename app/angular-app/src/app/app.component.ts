import { Component } from '@angular/core';

import { OstHttp } from './ost-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

    constructor(http : OstHttp){
     // testCsrfAddition(http);
    }
    
}







//Test code start
function testCsrfAddition( http ){
  
  let request = http.get("api/admin/kyc/dashboard/").subscribe( 
    response => {
      console.log("response"  , response); 
    },  
    error => {
      console.log("error" , error); 
    })
  
}
//Test code end