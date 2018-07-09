import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';


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
  hasError: boolean =false;
  errorMessage: string;
  constructor(private http: OstHttp, private stateHandler: RequestStateHandlerService) { }

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
          this.stateHandler.updateRequestStatus(this, false,false);
        } else{
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }
}
