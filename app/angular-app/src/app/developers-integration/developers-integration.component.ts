import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';

@Component({
  selector: 'app-developers-integration',
  templateUrl: './developers-integration.component.html',
  styleUrls: ['./developers-integration.component.scss']
})
export class DevelopersIntegrationComponent implements OnInit {

  dataUrl = "api/admin/client/developer-details";
  apiKey = "";
  apiSecret = "";
  amlLoginUrl = "";
  amlUsername = "";

  constructor(private http: OstHttp) { }

  ngOnInit() {
    this.getIntegrationInfo();
  }




  getIntegrationInfo(){
    this.http.get(this.dataUrl).subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.apiKey = res.data.api_key;
          this.apiSecret = res.data.api_secret;
          this.amlLoginUrl = res.data.aml_login_url;
          this.amlUsername = res.data.aml_username;

        }
      },
      error => {
        let err = error.json();
        console.log(error);
      })
  }
}
