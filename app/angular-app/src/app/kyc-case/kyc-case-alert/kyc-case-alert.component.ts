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
  failedReason  : Array<any>  = [];
  

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
        failedReasons                   = this.utilitites.deepGet(data ,  "user_kyc_comparison_detail.failed_reason") || [],

        kyc_status   = this.utilitites.deepGet(data ,  "case_detail.kyc_status") , 
        alertStatus  = "",

        //All status functions. 
        amlStatusCheck            : any,
        checkForAdminStatus       : any,
        whiteListHandling         : any,
        onAdminStatusApproved     : any,
        onAdminStatusPending      : any,
        onAutomation              : any,
        onManual                  : any,
        onImageProcessingComplete : any,
        processFailedReasons      : any,
        setAlertMessageAndStatus  : any
        ;

     amlStatusCheck = () => {
        if( cynopsis_status == "rejected"){
          setAlertMessageAndStatus("AML/CTF status denied, this case cannot be reopened." , "failed"); 
        }else {
          processFailedReasons();
          checkForAdminStatus();
        }
     }   

     checkForAdminStatus = () =>{
       if( admin_status == "denied" ){
        setAlertMessageAndStatus("Case manually denied by admin." , "failed"); 
       }else if( admin_status == "qualified"){
        onAdminStatusApproved();
       }else {
         onAdminStatusPending();
       }
     }

     onAdminStatusApproved = () => {
      if( cynopsis_status == "pending" ){
        if( approve_type == "auto"){
          setAlertMessageAndStatus("The case has been automatically qualified and is awaiting AML/CTF action." , "warning"); 
        }else{
          setAlertMessageAndStatus("The case has been manually qualified and is awaiting AML/CTF action." , "warning"); 
        }
      }else if( kyc_status == "approved" ){
        if( isWhitelistSetup ){
          whiteListHandling(); 
        }else{
          if( approve_type == "auto"){
            setAlertMessageAndStatus("The case has been automatically qualified." , "success");
          }else{
            setAlertMessageAndStatus("The case has been manually qualified." , "success");
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
        setAlertMessageAndStatus("Issue reported - " + last_issue_email_sent_humanized + " email sent" , "warning");
       }else if( cynopsis_status == "pending" ) {
         setAlertMessageAndStatus("Awaiting AML/CTF action." , "warning");
       }
     }

     onAutomation = () => {
        if( image_processing_status == "unprocessed" ){
          setAlertMessageAndStatus("Awaiting automation response." , "warning");
        }else if( image_processing_status == "failed" ){
          setAlertMessageAndStatus("Manual review needed." , "failed");
        }else {
          onImageProcessingComplete(); 
        }
     }

     onImageProcessingComplete = () =>{
        if( last_issue_email_sent_humanized && last_issue_email_sent_humanized.length > 0 ){
          setAlertMessageAndStatus("Issue reported - " + last_issue_email_sent_humanized + " email sent" , "warning");
        }else if( !automation_passed ) {
          setAlertMessageAndStatus("Manual review needed." , "failed");
        }
     }

     whiteListHandling = () => {
        if (whitelist_status == 'unprocessed' || whitelist_status == 'started') {
          if(  approve_type == "auto" ){
            setAlertMessageAndStatus("The case has been auto qualified. Whitelisting in progress." , "warning");
          }else {
            setAlertMessageAndStatus("The case has been manually qualified. Whitelisting in progress." , "warning");
          }
        } else if ( whitelist_status == 'done' && whitelist_confirmation_pending ) {
          if( approve_type == "auto"  ){
            setAlertMessageAndStatus("Case auto approved, whitelisting done. Awaiting confirmation." , "warning");
          }else{
            setAlertMessageAndStatus("Case maually approved, whitelisting done. Awaiting confirmation." , "warning");
          }
        } else if ( whitelist_status == 'done' && !whitelist_confirmation_pending) {
          if( approve_type == "auto"  ){
            setAlertMessageAndStatus("The case has been automatically qualified. Whitelisting done." , "success");
          }else{
            setAlertMessageAndStatus("The case has been manually qualified. Whitelisting done." , "success");
          }
        } else if (whitelist_status == 'failed') {
         
          if( approve_type == "auto"  ){
            setAlertMessageAndStatus("The case has been automatically qualified. Whitelisting failed." , "failed");
          }else{
            setAlertMessageAndStatus("The case has been manually qualified. Whitelisting failed." , "failed");
          }
        }
      }

      processFailedReasons = () =>{
        let cnt , len = failedReasons.length , 
            reasonKey ,  reasonMsg;
        if( len <= 0 ) return ; 
        for( cnt = 0 ;  cnt < len ;  cnt++ ){
          reasonKey = failedReasons[ cnt ]; 
          reasonMsg = this.failedReasonsMap[ reasonKey ]; 
          if( reasonMsg ){
            this.failedReason.push( reasonMsg ); 
          }
        }
      }

      setAlertMessageAndStatus = ( message :string , status:string ) => {
        this.alertMessage  = message; 
        alertStatus =  status; 
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

  failedReasonsMap = {
    ocr_unmatch : "Case cannot be automatically qualified, due to Optical Character Recognition ( OCR ) unmatch.", 
    fr_unmatch : "Case cannot be automatically qualified, due to low facial recognition ( FR ) match.", 
    residency_proof : "Case cannot be automatically qualified, due to residency proof documents.", 
    investor_proof : "Case cannot be automatically qualified, due to Investor proof.", 
    duplicate_kyc : "Case cannot be automatically qualified, due to duplicate status.", 
    token_sale_ended: "Case cannot be automatically qualified, as the token sale ended.", 
    case_closed_for_auto_approve: "Case cannot be automatically qualified, as the case is closed for auto approve."
  }

}
