import { Component, Input } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { AppConfigService } from '../../services/app-config.service';
import set = Reflect.set;
import {ScrollTopService} from "../../services/scroll-top.service";

declare var $:any;

@Component({
  selector: 'kyc-case-alert',
  templateUrl: './kyc-case-alert.component.html',
  styleUrls: ['./kyc-case-alert.component.scss']
})
export class KycCaseAlertComponent  {

  @Input('response') response : object = {};

  constructor(
    private utilitites : UtilitiesService,
    private appConfig  : AppConfigService,
    private scrollTop  : ScrollTopService
  ) {}

  alertMessage  : string      = null;
  alertConfig   : object      = null;
  failedReason  : Array<any>  = [];
  isMatchDetectedMsg : boolean = false;

  amlMatchCount: number;
  amlProcessingStatus: string;


  ngAfterContentInit() {
    let data =  this.response['data']
    ;

    let aml_status              = this.utilitites.deepGet(data ,  "case_detail.aml_status"),
        admin_status            = this.utilitites.deepGet(data ,  "case_detail.admin_status"),
        aml_processing_status   = this.utilitites.deepGet(data ,  "aml_detail.aml_processing_status") || "",
        aml_matches             = this.utilitites.deepGet(data ,  "aml_detail.aml_matches") || [],
        approve_type            = this.utilitites.deepGet(data ,  "client_kyc_pass_setting.approve_type"),
        last_qualified_type     = this.utilitites.deepGet(data ,  "case_detail.last_qualified_type"),
        whitelist_status        = this.utilitites.deepGet(data ,  "case_detail.whitelist_status"),
        image_processing_status = this.utilitites.deepGet(data ,  "user_kyc_comparison_detail.image_processing_status"),
        automation_passed       = this.utilitites.deepGet(data ,  "ai_pass_detail.automation_passed"),

        whitelist_confirmation_pending  = this.utilitites.deepGet(data ,  "case_detail.whitelist_confirmation_pending"),
        last_issue_email_sent_humanized = this.utilitites.deepGet(data ,  "case_detail.last_issue_email_sent_humanized"),
        isWhitelistSetup                = this.appConfig.getClientSetup().has_whitelist_setup,
        failedReasons                   = this.utilitites.deepGet(data ,  "user_kyc_comparison_detail.failed_reason") || [],

        kyc_status   = this.utilitites.deepGet(data ,  "case_detail.kyc_status") ,
        alertStatus  = "",
        approve_type_text = null,


        //All status functions.
        caseStatusCheck           : any,
        checkForAdminStatus       : any,
        whiteListHandling         : any,
        onAdminStatusPending      : any,
        onAutomation              : any,
        onManual                  : any,
        processFailedReasons      : any,
        setAlertMessageAndStatus  : any,
        checkForAMLProcessingStatus: any
        ;

    this.amlMatchCount = aml_matches.length
    this.amlProcessingStatus = aml_processing_status

    if( last_qualified_type == "auto_approved" ){
      approve_type_text = " automatically ";
    }else{
      approve_type_text = " manually ";
    }

    caseStatusCheck = () =>{
      if( kyc_status == "approved"){
        if( isWhitelistSetup ){
          whiteListHandling();
        }else{
          setAlertMessageAndStatus("The case has been" + approve_type_text + "approved." , "success");
        }
      } else if( kyc_status == "denied"){
        setAlertMessageAndStatus("Case manually denied by admin." , "failed");
      } else{
        checkForAdminStatus();
      }
      processFailedReasons();
    };

    checkForAdminStatus = () => {
      if( admin_status == "qualified"){
        checkForAMLProcessingStatus();
      } else{
        if( last_issue_email_sent_humanized && last_issue_email_sent_humanized.length > 0 ){
          setAlertMessageAndStatus("Details update requested - " + last_issue_email_sent_humanized + " email sent" , "warning");
        } else {
          onAdminStatusPending();
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
      setAlertMessageAndStatus("Manual review needed." , "warning");
    }

    onAutomation = () => {
      if( image_processing_status == "unprocessed" ){
        setAlertMessageAndStatus("Processing automation." , "warning");
      }else if( image_processing_status == "failed" ){
        setAlertMessageAndStatus("Manual review needed." , "warning");
      }else {
        setAlertMessageAndStatus("Manual review needed." , "warning");
      }
    };

    checkForAMLProcessingStatus = () => {
      if( aml_processing_status == "processed"){
        this.isMatchDetectedMsg =  true ;
        setAlertMessageAndStatus("AML check was successfully processed" , "warning")
      } else {
        setAlertMessageAndStatus("Case details have been approved. Processing AML/CTF check.", "warning")
      }
    };

     whiteListHandling = () => {
        if (whitelist_status == 'unprocessed' || whitelist_status == 'started') {
            setAlertMessageAndStatus("The case has been" + approve_type_text + "approved. Whitelisting in progress." , "warning");
        } else if ( whitelist_status == 'done' && whitelist_confirmation_pending ) {
            setAlertMessageAndStatus("Case"+ approve_type_text + "approved, whitelisting done. Awaiting confirmation." , "warning");
        } else if ( whitelist_status == 'done' && !whitelist_confirmation_pending) {
            setAlertMessageAndStatus("The case has been" + approve_type_text + "approved. Whitelisting done." , "success");
        } else if (whitelist_status == 'failed') {
            setAlertMessageAndStatus("The case has been" + approve_type_text + "approved. Whitelisting failed." , "failed");
        }
      }

      processFailedReasons = () =>{
        if( approve_type != "auto") return ;
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

      caseStatusCheck();

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
    case_closed_for_auto_approve: "Case cannot be automatically qualified, as the case is closed for auto approve.",
    human_labels_percentage_low: "Case cannot be automatically qualified, due to human facial characteristics not matching in facial recognition."
  }

  scrollToAmlSection(){
    let el = $('#aml-section-wrapper')[0],
        fromEl = $('html,body');
    this.scrollTop.scrollTo( el, fromEl);
  }

}
