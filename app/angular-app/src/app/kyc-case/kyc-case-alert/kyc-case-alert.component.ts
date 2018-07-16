import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KycBannerConfigService } from '../../services/kyc-banner-config.service';
import { UtilitiesService } from '../../services/utilities.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'kyc-case-alert',
  templateUrl: './kyc-case-alert.component.html',
  styleUrls: ['./kyc-case-alert.component.scss']
})
export class KycCaseAlertComponent  {

  @Input('response') response : object = {};
  @Output('alertCodeEvent') alertCode: EventEmitter<string> = new EventEmitter();

  constructor(
    private kycBannerConfig : KycBannerConfigService,
    private utilitites      : UtilitiesService,
    private appConfig       : AppConfigService
  ) {}

  alertMessage  : string  = null; 
  alertConfig   : object  = null; 


  // ngOnInit() {
  //   let data =  this.response['data']
  //   ;

  //   let kyc_status          = this.utilitites.deepGet(data ,  "case_detail.kyc_status") , 
  //       cynopsis_status     = this.utilitites.deepGet(data ,  "case_detail.cynopsis_status"), 
  //       last_qualified_type = this.utilitites.deepGet(data ,  "case_detail.last_qualified_type"),
  //       admin_status        = this.utilitites.deepGet(data ,  "case_detail.admin_status"),
  //       whitelist_status    = this.utilitites.deepGet(data ,  "case_detail.whitelist_status"),
  //       automation_passed   = this.utilitites.deepGet(data ,  "ai_pass_detail.automation_passed"),
  //       approve_type        = this.utilitites.deepGet(data ,  "client_kyc_pass_setting.approve_type"),
        
  //       whitelist_confirmation_pending  = this.utilitites.deepGet(data ,  "case_detail.whitelist_confirmation_pending"),
  //       last_issue_email_sent           = this.utilitites.deepGet(data ,  "case_detail.last_issue_email_sent"),
  //       last_issue_email_sent_humanized = this.utilitites.deepGet(data ,  "case_detail.last_issue_email_sent_humanized"),
  //       image_processing_status         = this.utilitites.deepGet(data ,  "user_kyc_comparison_detail.image_processing_status"),
  //       isWhitelistSetup               = this.appConfig.getClientSetup().has_whitelist_setup,

  //       alertStatus = null
  //       ;

  //   if( cynopsis_status == "rejected"   ){
  //     alertStatus = "failed"; 
  //     this.alertMessage = "AML/CTF status denied, this case cannot be reopned";
  //   }else  if(  approve_type == "manual" ){
  //     if( admin_status == "approved" ){
  //       if( cynopsis_status == "unprocessed" ){
  //         alertStatus = "warning"; 
  //         this.alertMessage = "The case has been manually qualified and is awaiting AML/CTF action.";
  //       }else {
  //         whiteListHandling(); 
  //       }
  //     }else if( admin_status == "denied" ){
  //       alertStatus = "success"; 
  //       this.alertMessage = "The case has been manually denied.";
  //     }
  //   }else if(  approve_type == "auto"  ){
  //     if( image_processing_status == "unprocessed" ){
  //         alertStatus = "warning"; 
  //         this.alertMessage = "Awaiting automation response.";
  //     }else if( image_processing_status == "processed" ){
      
  //     }else if( image_processing_status == "failed" ){
  //       alertStatus = "failed"; 
  //       this.alertMessage = "Manual review needed.";
  //     }
  //   }


  //   let whiteListHandling= function(){
  //     if (isWhitelistSetup) {
  //       if (whitelist_status == 'unprocessed' || whitelist_status == 'started') {
  //         alertStatus =  "warning"; 
  //         this.alertMessage = "Case approved - whitelisting in progress";
  //       } else if ( whitelist_status == 'done' && whitelist_confirmation_pending ) {
  //         alertStatus =  "warning"; 
  //         this.alertMessage = "Case approved - whitelisting done, awaiting confirmation";
  //       } else if ( whitelist_status == 'done' && !whitelist_confirmation_pending) {
  //         alertStatus =  "success"; 
  //         this.alertMessage = "The case has been approved";
  //       } else if (whitelist_status == 'failed') {
  //         alertStatus =  "warning"; 
  //         this.alertMessage = "Case approved - whitelisting failed";
  //       }
  //     } else {
  //       alertStatus =  "success"; 
  //       this.alertMessage = "The case has been approved";
  //     }
  //   }
  
  // }



  ngOnChanges() {
    let data          = this.response['data'] ,
        alertKeyMap   = this.kycBannerConfig['alertKeyMap'], 
        alertKeys     = Object.keys(alertKeyMap),
        cnt , len     = alertKeys.length,
        
        alertKey , alertKeyPath , alertkeyObj,  alertKeyVal ,
         
        alertCode = "",

        sperator = "_"
        ; 
    if( !len || !data ) return false ; 
    for(  cnt = 0 ; cnt < len ; cnt ++) {
      alertKey              =  alertKeys[ cnt ]; 
      alertkeyObj           = alertKeyMap[ alertKey ];
      alertKeyPath          = alertkeyObj['path'];
      alertKeyVal           = String ( this.utilitites.deepGet( data ,  alertKeyPath ) ); 
      if( alertKeyVal ){
       if( alertCode ) {
        alertCode += sperator + ( alertkeyObj[alertKeyVal] ||  alertkeyObj['noStatus'] );
       }else{
        alertCode += ( alertkeyObj[alertKeyVal] ||  alertkeyObj['noStatus'] );
       }
      }
    }

    console.log( "alertCode - " , alertCode ); 

    this.initBanner( alertCode ); 
  }
  
    initBanner( alertCode : string ) {
      if(!alertCode) return ; 
      let config      = this.kycBannerConfig.config,
          statusUIMap = this.kycBannerConfig.statusUIMap,
          alertConfig = config[alertCode],
          alertMsg    = alertConfig && alertConfig['alertMessage'],
          alertStatus = alertConfig && alertConfig['status']
          ;
     this.alertMessage = alertMsg; 
     this.alertConfig  = statusUIMap[alertStatus]; 
    }

}
