import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  clientName       : string        = "";
  domainName       : string        = "";
  superAdminEmails : Array<string> = [""];
  dataUrl = "api/admin/client/profile";

  hasError     : boolean = false;
  hasLoaded    : boolean = false;
  isProcessing : boolean = true;
  errorMessage : string;
  errorResponse;

  constructor(private http: OstHttp,
              private stateHandler : RequestStateHandlerService) { }

  ngOnInit() {
    this.getProfileInfo();
  }

  getProfileInfo(){
    this.http.get(this.dataUrl).subscribe(
      response => {
        let res = response.json();
        this.hasLoaded = true;
        if(res.success){
          this.clientName = res.data.name;
          this.domainName = res.data.domain_name;
          this.superAdminEmails = res.data.super_admin_email_ids;
          this.stateHandler.updateRequestStatus(this, false,false);
        }
        else{
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }
}
