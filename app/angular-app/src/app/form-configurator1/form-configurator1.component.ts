import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

@Component({
  selector: 'app-form-configurator1',
  templateUrl: './form-configurator1.component.html',
  styleUrls: ['./form-configurator1.component.scss']
})
export class FormConfigurator1Component implements OnInit {
  hasError: boolean =false;
  errorMessage: string;
  errorResponse;
  showButton = false;
  gid;
  uuid;
  redirectLocation = '/admin/configurator/theme';
  isProcessing = true;


  constructor( public appConfig : AppConfigService,
               private http: OstHttp,
               private stateHandler : RequestStateHandlerService ) { }

  ngOnInit() {
    this.getUnpublishedDraft();
  }

  goToFormConfigurator() {
    this.http.post('api/admin/configurator/create-group' , {} ).subscribe(
      response => {
        let res = response.json();
        if( res.success ){
          console.log("success---"+res);
          this.gid = res.data.gid;
          this.uuid = res.data.uuid;
          window.location.href = this.redirectLocation+'?gid='+this.gid+'&uuid='+this.uuid;
        }else{
          this.errorResponse = res;
          console.log("error---"+this.errorResponse);
        }
      },
      error => {
        let err = error.json();
        console.log("err---"+err);
        this.errorResponse = err;
      }
    )
  }

  getUnpublishedDraft() {
    this.http.get('api/admin/configurator/').subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.stateHandler.updateRequestStatus(this, false,false);
          this.gid = res.data.gid;
          this.uuid = res.data.uuid;
          if(this.gid && this.uuid){
            this.showButton = true;
          }
        } else {
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }

  openUnpublishedDraft() {
    window.location.href = this.redirectLocation+'?gid='+this.gid+'&uuid='+this.uuid;
  }

}
