import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OstHttp } from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { AppConfigService } from '../services/app-config.service';

declare var $: any;

@Component({
  selector: 'app-kyc-case',
  templateUrl: './kyc-case.component.html',
  styleUrls: ['./kyc-case.component.scss']
})
export class KycCaseComponent implements OnInit {

  isProcessing: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';
  showCase: boolean = true;
  showReportIssue: boolean = false;
  showUpdateEth: boolean = false;
  isInitDuplicateTable:boolean = false;
  isInitLogTabel:boolean = false;
  caseDetails;
  user_kyc_comparison_detail;
  client_kyc_pass_setting;
  ai_pass_detail;
  image_processing_status;
  userDetails;
  response;
  meta: object = {};
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  caseId;
  nextCaseId;
  previousCaseId;
  widthComputed = false;
  isStatusDenied :boolean =  false ;
  isReportIssue :boolean = false ;
  isWhitelisting:boolean =  false;
  submittedDetails = ['birthdate', 'country', 'document_id_number', 'email', 'first_name', 'last_name', 'nationality',
                      'postal_code', 'submitted_at', 'street_address', 'city', 'state'];

  constructor(
    public activatedRoute: ActivatedRoute,
    private http: OstHttp,
    private stateHandler : RequestStateHandlerService,
    private domSanitizer: DomSanitizer,
    private appConfig: AppConfigService
  ) { }

  ocr_comparison_fields;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.caseId = params.get('id');
      this.fetchCase();
    //  this.hideModal();
    });

  }

  ngAfterViewChecked(){
    if ($(".card").length && ! this.widthComputed){
      this.widthComputed = true;
      let computedWidth = $(".card.grey-background").css("width").slice(0,-2) - 100 + "px";
      $(".card.grey-background").css("min-height", computedWidth);
      $("img.card-img-top").on("load", function(){
        $(".card.grey-background").css("min-height", '');
      });
    }
  }

  fetchCase() {
    this.widthComputed = false;
    this.isProcessing = true;
    let params = Object.assign(
      {id: this.caseId},
      this.activatedRoute.snapshot.queryParams
    );
    this.http.get('api/admin/kyc/check-details/', {params: params}).subscribe( response => {
      let json_response = response.json();
      if(json_response.success){
        this.onSuccess( response.json());
      } else {
        this.stateHandler.updateRequestStatus( this, false,  true , false ,  json_response);
      }
    }, error => {
      this.stateHandler.updateRequestStatus( this, false,  true , false ,  error.json());
    })
  }


  hideModal(){
    $("#detailsModal").modal('hide');
  }

  onSuccess( res ) {
    this.response  = res;
    this.caseDetails = res.data.case_detail;
    this.userDetails = res.data.user_detail;
    this.user_kyc_comparison_detail = res.data.user_kyc_comparison_detail;
    this.client_kyc_pass_setting = res.data.client_kyc_pass_setting;
    this.ai_pass_detail = res.data.ai_pass_detail;
    this.ocr_comparison_fields = this.client_kyc_pass_setting.ocr_comparison_fields;
    this.image_processing_status =  this.user_kyc_comparison_detail.image_processing_status;
    //this.kycCaseAlertComponent.ostAlert(this.caseDetails, this.alertStyleClass, this.svgClass, this.svgId, this.alertMessage  );
    this.userDetails['extraDiv'] = this.checkForOddSections();
    this.meta = res.data.meta;
    this.stateHandler.updateRequestStatus( this, false,  false);
    this.getNextPrevious(res.data.meta);
    this.showPageState();
    this.setAdminConfig();
    this.setFRText();
    this.setOpticalCharacterReg();
    this.setamlCtfStatusConfig();

  }

  showPageState(showCase = true, showReportIssue = false , showUpdateEth = false){
    this.showCase = showCase;
    this.showReportIssue = showReportIssue;
    this.showUpdateEth = showUpdateEth;
  }

  bypassSecurityTrustResourceUrl(url){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onActionSuccess(e){
    this.fetchCase();
  }

  initDuplicateTable(){
    this.isInitDuplicateTable =true;
  }

  initLogTabel(){
    this.isInitLogTabel =true;
  }

  getNextPrevious(meta){
    this.hasNextPage = Object.keys(meta.next_page_payload).length > 0;
    this.hasPreviousPage = Object.keys(meta.previous_page_payload).length > 0;
    this.nextCaseId = this.hasNextPage ? meta.next_page_payload.id : 0;
    this.previousCaseId = this.hasPreviousPage ? meta.previous_page_payload.id : 0;
  }

  getDocType(url){
    return url.includes("/i/") ? 'image' : 'pdf';
  }

  checkForOddSections() {
    let count = 0;
    for (var i of this.submittedDetails){
      if (this.userDetails[i]) {
        count += 1;
      }
    }
    return count % 2;
  }

  FRconfig = null ;
  setFRText(){
    let image_processing_status = this.user_kyc_comparison_detail.image_processing_status || "unprocessed",
        clientFr = this.client_kyc_pass_setting.fr_match_percent
      ;
    if( image_processing_status == "unprocessed"  ){
      this.FRconfig = {
       text:  "Pending",
       class: "yellow-bar"
       }
    }else if( image_processing_status == "failed"){
      this.FRconfig = {
        text:  "Failed",
        class: "red-bar"
        }
    }else{
      let FRValue         = this.user_kyc_comparison_detail.face_match_percent,
          settingFRValue  = this.client_kyc_pass_setting.fr_match_percent,
          className       = "green-bar"
          ;
      if( FRValue < settingFRValue ){
        className = "red-bar"
      }
      this.FRconfig = {
        text  :  (FRValue || "0") + " %" ,
        class : className
        }
    }
  }

  OCRconfig =  null
  setOpticalCharacterReg() {
    let image_processing_status = this.user_kyc_comparison_detail.image_processing_status || "unprocessed",
        ocrStatus = this.ai_pass_detail.ocr_match_status
      ;
    if( image_processing_status == "unprocessed"  ){
      this.OCRconfig = {
        text:  "Pending",
        class: "yellow-bar"
       }
    }else if( ocrStatus ){
      this.OCRconfig = {
        text:  "Passed",
        class: "green-bar"
      }
    }else{
      this.OCRconfig = {
        text:  "Failed",
        class: "red-bar"
      }
    }
  }

  adminStatusConfig = null ;
  setAdminConfig(){
    let adminStatus = this.caseDetails.admin_status ;
    if(adminStatus == "unprocessed" ){
      this.adminStatusConfig = {
        text:  "Pending",
        class: "yellow-bar"
       }
    }else if( adminStatus == "qualified" ){
      this.adminStatusConfig = {
        text:  "Qualified",
        class: "green-bar"
       }
    }else if( adminStatus == "denied" ) {
      this.adminStatusConfig = {
        text:  "Denied",
        class: "red-bar"
       }
    }
  }

  amlCtfStatusConfig = null ;
  setamlCtfStatusConfig(){
    let amlCtfStatus = this.caseDetails.cynopsis_status ;
    if(amlCtfStatus == "pending" ){
      this.amlCtfStatusConfig = {
        text:  "Pending",
        class: "yellow-bar"
       }
    }else if( amlCtfStatus == "cleared" ){
      this.amlCtfStatusConfig = {
        text:  "Cleared",
        class: "green-bar"
       }
    }else if( amlCtfStatus == "denied" ) {
      this.amlCtfStatusConfig = {
        text:  "Denied",
        class: "red-bar"
       }
    }
  }

  isOCRFailed( key ){
      if(!this.ai_pass_detail.ocr_match_status){
        let failedReason = this.user_kyc_comparison_detail.failed_reason || [],
            clientOcrSetting = this.client_kyc_pass_setting.ocr_comparison_fields || []
        ;
        return clientOcrSetting.indexOf( key ) > -1  && failedReason.indexOf( key ) > -1 ;
      }else{
        return false ;
      }
  }


}


