import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'kyc-case-alert',
  templateUrl: './kyc-case-alert.component.html',
  styleUrls: ['./kyc-case-alert.component.scss']
})
export class KycCaseAlertComponent  {

  @Input('response') response : object = {};

  constructor(
    private utilitites      : UtilitiesService,
    private appConfig       : AppConfigService
  ) {}

  alertMessage  : string      = null; 
  alertConfig   : object      = null; 
  failedReason  : Array<any>  = null;
  

  ngAfterContentInit() {
    var data =  this.response['data']
    ;

    var cynopsis_status         = this.utilitites.deepGet(data ,  "case_detail.cynopsis_status"), 
        admin_status            = this.utilitites.deepGet(data ,  "case_detail.admin_status"),
        approve_type            = this.utilitites.deepGet(data ,  "client_kyc_pass_setting.approve_type"),
        whitelist_status        = this.utilitites.deepGet(data ,  "case_detail.whitelist_status"),
        image_processing_status = this.utilitites.deepGet(data ,  "user_kyc_comparison_detail.image_processing_status"),
        automation_passed       = this.utilitites.deepGet(data ,  "ai_pass_detail.automation_passed"),
        
        whitelist_confirmation_pending  = this.utilitites.deepGet(data ,  "case_detail.whitelist_confirmation_pending"),
        last_issue_email_sent_humanized = this.utilitites.deepGet(data ,  "case_detail.last_issue_email_sent_humanized"),
        isWhitelistSetup                = this.appConfig.getClientSetup().has_whitelist_setup,
        failedReasons                   = this.utilitites.deepGet(data ,  "user_kyc_comparison_detail.failed_reason"),

        last_qualified_type   = this.utilitites.deepGet(data ,  "case_detail.last_qualified_type"),
        kyc_status            = this.utilitites.deepGet(data ,  "case_detail.kyc_status") , 
        last_issue_email_sent = this.utilitites.deepGet(data ,  "case_detail.last_issue_email_sent"),
        alertStatus           = "",

        //All status functions. 
        amlStatusCheck            : any,
        checkForAdminStatus       : any,
        whiteListHandling         : any,
        onAdminStatusApproved     : any,
        onAdminStatusPending      : any,
        onAutomation              : any,
        onManual                  : any,
        onImageProcessingComplete : any
        ;

     amlStatusCheck = () => {
        if( cynopsis_status == "rejected"){
          alertStatus = 'failed'; 
          this.alertMessage = "AML/CTF status denied, this case cannot be reopened.";  
        }else {
          this.failedReason = failedReasons; 
          checkForAdminStatus();
        }
     }   

     checkForAdminStatus = () =>{
       if( admin_status == "denied" ){
        alertStatus = 'failed';
        this.alertMessage = "Case manually denied by admin.";  
       }else if( admin_status == "qualified"){
        onAdminStatusApproved();
       }else {
         onAdminStatusPending();
       }
     }

     onAdminStatusApproved = () => {
      if( cynopsis_status == "pending" ){
        alertStatus = 'warning';
        if( approve_type == "auto"){
          this.alertMessage = "The case has been automatically qualified and is awaiting AML/CTF action.";  
        }else{
          this.alertMessage = "The case has been manually qualified and is awaiting AML/CTF action.";  
        }
      }else if( kyc_status == "approved" ){
        if( isWhitelistSetup ){
          whiteListHandling(); 
        }else{
          alertStatus =  "success"; 
          if( approve_type == "auto"){
            this.alertMessage = "The case has been automatically qualified.";  
          }else{
            this.alertMessage = "The case has been manually qualified.";  
          }
        }
      }
     }

     onAdminStatusPending = () =>{
       if( approve_type == "auto"){
          onAutomation(); 
       }else{
          onManual(); 
       }
     }

     onManual = () =>{
       if( last_issue_email_sent_humanized && last_issue_email_sent_humanized.length > 0 ){
        alertStatus = 'warning';
        this.alertMessage = "Issue reported - " + last_issue_email_sent_humanized + " email sent"; 
       }else if( cynopsis_status == "pending" ) {
         alertStatus = "warning";
         this.alertMessage = "Awaiting AML/CTF action."
       }
     }

     onAutomation = () => {
        if( image_processing_status == "unprocessed" ){
          alertStatus = 'warning';
          this.alertMessage = "Awaiting automation response.";  
        }else if( image_processing_status == "failed" ){
          alertStatus = 'failed';
          this.alertMessage = "Manual review needed.";
        }else {
          onImageProcessingComplete(); 
        }
     }

     onImageProcessingComplete = () =>{
        if( last_issue_email_sent_humanized && last_issue_email_sent_humanized.length > 0 ){
          alertStatus = 'warning';
          this.alertMessage = "Issue reported - " + last_issue_email_sent_humanized + " email sent";
        }else if( !automation_passed ) {
          alertStatus = 'failed';
          this.alertMessage = "Manual review needed.";
        }
     }

     whiteListHandling = () => {
        if (whitelist_status == 'unprocessed' || whitelist_status == 'started') {
          alertStatus =  "warning"; 
          if(  approve_type == "auto" ){
            this.alertMessage = "The case has been auto qualified. Whitelisting in progress.";
          }else {
            this.alertMessage = "The case has been manually qualified. Whitelisting in progress.";
          }
        } else if ( whitelist_status == 'done' && whitelist_confirmation_pending ) {
          alertStatus =  "warning"; 
          if( approve_type == "auto"  ){
            this.alertMessage = "Case auto approved, whitelisting done. Awaiting confirmation";
          }else{
            this.alertMessage = "Case maually approved, whitelisting done. Awaiting confirmation";
          }
        } else if ( whitelist_status == 'done' && !whitelist_confirmation_pending) {
          alertStatus =  "success"; 
          if( approve_type == "auto"  ){
            this.alertMessage = "The case has been automatically qualified. Whitelisting done.";
          }else{
            this.alertMessage = "The case has been manually qualified. Whitelisting done.";
          }
        } else if (whitelist_status == 'failed') {
          alertStatus =  "warning"; 
          if( approve_type == "auto"  ){
            this.alertMessage = "The case has been automatically qualified. Whitelisting failed.";
          }else{
            this.alertMessage = "The case has been manually qualified. Whitelisting failed.";
          }
        }
      }

      amlStatusCheck(); 

      console.log("kyc case reponses", data ); 
      console.log("alertStatus",  "alertStatus"); 
      console.log("this.alertMessage",  this.alertMessage); 
      if( alertStatus ){
        this.alertConfig = this.statusUIMap[ alertStatus ]; 
      }

  }


  //Default UI map
  statusUIMap = {
    "success": {
      "alertStyleClass": "alert-success",
      "svgClass": "alert-success-svg",
      "svgId":"#kyc-success-icon"
    },

    "failed": {
      "alertStyleClass" : 'alert-danger',
      "svgClass" : 'alert-error-svg',
      "svgId" : '#kyc-error-icon'
    },

    "warning":{
      "alertStyleClass" : 'alert-warning',
      "svgClass" : 'alert-warning-svg',
      "svgId" : '#kyc-warning-icon'
    }
  }

}
