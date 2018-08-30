import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

declare var $: any ;

@Component({
  selector: 'app-form-configurator',
  templateUrl: './form-configurator.component.html',
  styleUrls: ['./form-configurator.component.scss']
})
export class FormConfiguratorComponent implements OnInit {
  gid;
  uuid;
  errorMessage: string;
  isProcessing  = false;
  showButton    = false;
  errorResponse = null;
  hasError: boolean = false;
  isPublishing: boolean = false ;
  btnText           = 'Import from sandbox and publish live';
  createBtnClass    = 'btn-primary';
  redirectLocation  = '/admin/configurator/theme';
  environment       = this.appConfig.getEnvironment();

  constructor( public appConfig : AppConfigService,
               private http: OstHttp,
               private stateHandler : RequestStateHandlerService ) { }

  ngOnInit() {
    if( this.showSandboxSection() ){
      this.getUnpublishedDraft();
    }
  }

  importAndPublish( form_configurator ) {
    let params =  form_configurator.value;
    if (form_configurator.valid){
      this.btnText = 'Processing...';
      this.isPublishing =  true ;
      this.http.get('api/admin/configurator/fetch-published-version' , {params: params }  ).subscribe(
        response => {
          let res = response.json();
          this.btnText = 'Import from sandbox and publish live';
          this.isPublishing =  false ;
          if( res.success ){
            $('#successModal').modal('show');
          }else{
            this.errorResponse = res;
          }
        },
        error => {
          let err = error.json();
          this.errorResponse = err;
          this.btnText = 'Import from sandbox and publish live';
          this.isPublishing =  false ;
        }
      )
    }
  }

  goToFormConfigurator() {
    this.http.post('api/admin/configurator/create-group' , {} ).subscribe(
      response => {
        let res = response.json();
        if( res.success ){
          this.gid = res.data.gid;
          this.uuid = res.data.uuid;
          window.location.href = this.redirectLocation+'?gid='+this.gid+'&uuid='+this.uuid;
        }else{
          this.errorResponse = res;
        }
      },
      error => {
        let err = error.json();
        this.errorResponse = err;
      }
    )
  }

  getUnpublishedDraft() {
    this.isProcessing = true;
    this.http.get('api/admin/configurator/').subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.stateHandler.updateRequestStatus(this, false,false);
          this.gid  = res.data.gid;
          this.uuid = res.data.uuid;
          if(this.gid && this.uuid){
            this.createBtnClass = 'btn-secondary';
            this.showButton     = true;
          } else {
            this.createBtnClass = 'btn-primary';
          }
        } else {
          this.errorResponse = res;
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.errorResponse = err;
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }

  openUnpublishedDraft() {
    window.location.href = this.redirectLocation+'?gid='+this.gid+'&uuid='+this.uuid;
  }

  showSandboxSection() {
    return (( this.environment == 'sandbox') || (this.environment == 'staging') || (this.environment == 'development'));
  }

  showProductionSection() {
    return (( this.environment == 'production') || (this.environment == 'staging') || (this.environment == 'development'));
  }

  showDivider() {
    return ( this.showSandboxSection() && this.showProductionSection());
  }

}
