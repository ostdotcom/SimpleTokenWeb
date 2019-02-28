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

  gid : string = null;
  uuid: string = null;

  errorMessage  : string  = null;
  isProcessing  : boolean = false;
  hasError      : boolean = false;

  showButton    : boolean = false;
  isPublishing  : boolean = false ;

  importAndPublishError     : object =  null;
  goToFormConfiguratorError : object =  null;

  clientURL           : string  =  null;
  redirectLocation    : string  = '/admin/configurator/theme';
  btnText             : string  = 'Import from sandbox and publish live';
  createDraftBtnText  : string  = "Create New Draft" ;
  createBtnClass      : string  = 'btn-primary';
  isCreatingDraft     : boolean = false;

  environment  = this.appConfig.getEnvironment();

  domainName : string  = "";
  hasLoaded  : boolean = false;

  constructor( public appConfig : AppConfigService,
               private http: OstHttp,
               private stateHandler : RequestStateHandlerService ) { }

  ngOnInit() {
    this.getUnpublishedDraft();
  }

  importAndPublish( ) {
      this.preImportAndPublish();
      this.http.post('api/admin/configurator/fetch-published-version', null).subscribe(
        response => {
          let res       = response.json() ;
          this.onImportAndPublishSuccess( res );
        },
        error => {
          let err = error.json();
          this.onImportAndPublishError( err );
        }
      )
  }

  preImportAndPublish(){
    this.importAndPublishError  = null;
    this.isPublishing           = true ;
    this.btnText                = 'Processing...';
  }

  onImportAndPublishSuccess( res ){
    let data      = res && res.data ,
        clientURL = data && data.published_url
    ;
    if( res.success ){
      this.clientURL = clientURL;
      $('#successModal').modal('show');
      this.onImportAndPublishComplete();
    }else {
      this.onImportAndPublishError( res );
    }
  }

  onImportAndPublishError( error ){
    this.importAndPublishError = error || null;
    this.onImportAndPublishComplete( );
  }

  onImportAndPublishComplete(  ){
    this.isPublishing =  false ;
    this.btnText      = 'Import from sandbox and publish live';
  }

  goToFormConfigurator() {
    this.preGoToFormConfigurator();
    this.http.post('api/admin/configurator/create-group' , {} ).subscribe(
      response => {
        let res = response.json();
        this.onGoToFormConfiguratorSuccess( res );
      },
      error => {
        let err = error.json();
        this.onGoToFormConfiguratorError( err );
      }
    )
  }

  preGoToFormConfigurator(){
    this.goToFormConfiguratorError  = null;
    this.createDraftBtnText         = "Creating...";
    this.isCreatingDraft            = true;
  }

  onGoToFormConfiguratorSuccess( res ){
    if( res.success ){
      this.gid = res.data.gid;
      this.uuid = res.data.uuid;
      window.location.href = this.redirectLocation+'?gid='+this.gid+'&uuid='+this.uuid;
    }else{
      this.onGoToFormConfiguratorError( res );
    }
  }

  onGoToFormConfiguratorError( error ){
    this.goToFormConfiguratorError = error || null;
    this.onGoToFormConfiguratorComplete( );
  }

  onGoToFormConfiguratorComplete(  ){
    this.createDraftBtnText = "Create New Draft" ;
    this.isCreatingDraft    = false;
  }

  getUnpublishedDraft() {
    this.isProcessing = true;
    this.http.get('api/admin/configurator/').subscribe(
      response => {
        let res = response.json();
        if(res.success){
          this.stateHandler.updateRequestStatus(this, false,false);
          this.hasLoaded = true;
          this.gid  = res.data.gid;
          this.uuid = res.data.uuid;
          this.domainName = res.data.domain_name;
          if(this.gid && this.uuid){
            this.createBtnClass = 'btn-secondary';
            this.showButton     = true;
          } else {
            this.createBtnClass = 'btn-primary';
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
