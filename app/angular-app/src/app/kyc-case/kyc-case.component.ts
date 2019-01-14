import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OstHttp } from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { AppConfigService } from '../services/app-config.service';
import { ScrollTopService } from '../services/scroll-top.service';

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


  amlMatchedIds: Array<string> = [];
  amlUnMatchedIds: Array<string> = [];

  showPageStateFn : Function

  constructor(
    public activatedRoute: ActivatedRoute,
    private http: OstHttp,
    private stateHandler : RequestStateHandlerService,
    public appConfig: AppConfigService,
    private scrollTopService: ScrollTopService
  ) { }

  ocr_comparison_fields;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.caseId = params.get('id');
      this.fetchCase();
    });

    this.showPageStateFn = this.showPageState.bind( this );
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

  initTooltip(){
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip();
    },0);
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
    this.userDetails['extraDiv'] = this.checkForOddSections();
    this.meta = res.data.meta;
    this.stateHandler.updateRequestStatus( this, false,  false);
    this.getNextPrevious(res.data.meta);
    this.setAdminConfig();
    this.setFRText();
    this.setOpticalCharacterReg();
    this.setAmlCtfStatusConfig();
    this.initTooltip();
    this.scrollTopService.scrollTop();
  }

  showPageState(showCase = true, showReportIssue = false){
    this.showCase = showCase;
    this.showReportIssue = showReportIssue;
  }

  onActionSuccess( res ){
    if( res && res.data && res.data.case_detail ) {
      this.onSuccess( res );
    } else{
      this.fetchCase();
    }
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

  FRconfig = {} ;
  setFRText(){
    let image_processing_status = this.user_kyc_comparison_detail.image_processing_status || "unprocessed"
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
    }else if( image_processing_status == "processed" ){
      let  className = "red-bar" ,
           FRValue   = this.user_kyc_comparison_detail.face_match_percent;
      if( this.ai_pass_detail.fr_pass_status ){
        className = "green-bar"
      }
      this.FRconfig = {
        text  :  (Number(FRValue) || 0) + " %",
        class : className
      }
    }
  }

  OCRconfig =  {}
  setOpticalCharacterReg() {
    let image_processing_status = this.user_kyc_comparison_detail.image_processing_status || "unprocessed",
        ocrStatus = this.ai_pass_detail.ocr_match_status
      ;
    if( image_processing_status == "unprocessed"  ){
      this.OCRconfig = {
        text:  "Pending",
        class: "yellow-bar"
       }
    }else if(image_processing_status == "failed" ){
      this.OCRconfig = {
        text:  "Failed",
        class: "red-bar"
      }
    }else {
      if( ocrStatus ){
        this.OCRconfig = {
          text:  "Match",
          class: "green-bar"
        }
      }else {
        this.OCRconfig = {
          text:  "Unmatch",
          class: "red-bar"
        }
      }
    }
  }

  adminStatusConfig = {} ;
  setAdminConfig(){
    let adminStatus = this.caseDetails.admin_status ;
    if(adminStatus == "unprocessed" ){
      this.adminStatusConfig = {
        text:  "Unprocessed",
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
  setAmlCtfStatusConfig(){
    let amlCtfStatus = this.caseDetails.aml_status ;
    if( amlCtfStatus == "pending" || amlCtfStatus == "unprocessed"){
      this.amlCtfStatusConfig = {
        text: amlCtfStatus,
        class: "yellow-bar"
       }
    }else if( amlCtfStatus == "cleared" || amlCtfStatus == "approved" ){
      this.amlCtfStatusConfig = {
        text:  amlCtfStatus,
        class: "green-bar"
       }
    }else if( amlCtfStatus == "failed" || amlCtfStatus == "rejected" ) {
      this.amlCtfStatusConfig = {
        text:  amlCtfStatus,
        class: "red-bar"
       }
    }
  }

  isOCRFailed( key ){
      if( this.ai_pass_detail.ocr_match_status == false ){
        let failedOcrFields  = this.ai_pass_detail.ocr_match_fields || [],
            clientOcrFields  = this.client_kyc_pass_setting.ocr_comparison_fields || []
        ;
       return clientOcrFields.indexOf( key ) > -1 && !failedOcrFields[key] ;
      }else{
        return false ;
      }
  }

  getParams(){
    return {
      'id' : this.caseId,
      'matched_ids' : this.amlMatchedIds,
      'unmatched_ids' : this.amlUnMatchedIds
    }
  }
}


