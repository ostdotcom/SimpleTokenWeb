import { Component, OnInit } from '@angular/core';
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {OstHttp} from "../services/ost-http.service";
import {AppConfigService} from "../services/app-config.service";

@Component({
  selector: 'app-advance-compliance',
  templateUrl: './advance-compliance.component.html',
  styleUrls: ['./advance-compliance.component.scss']
})
export class AdvanceComplianceComponent implements OnInit {

  dataUrl     = "api/admin/setting/aml-details";
  amlLoginUrl = "";
  amlUsername = "";

  hasError     : boolean = false;
  isProcessing : boolean = true;
  errorMessage : string;
  errorResponse;


  constructor(private http: OstHttp, private stateHandler: RequestStateHandlerService,
              public appConfig : AppConfigService ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.http.get(this.dataUrl).subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.amlLoginUrl  = res.data.aml_login_url;
          this.amlUsername  = res.data.aml_username;
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
