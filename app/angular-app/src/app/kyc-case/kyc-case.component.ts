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
  userDetails;
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
  alertStyleClass: string;
  svgClass: string;
  svgId: string;
  alertMessage: string = "";


  constructor(
    public activatedRoute: ActivatedRoute,
    private http: OstHttp,
    private stateHandler : RequestStateHandlerService,
    private domSanitizer: DomSanitizer,
    private appConfig : AppConfigService
  ) { }

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

  ostAlert(){

    let kyc_status = this.caseDetails.kyc_status;
    let cynopsis_status = this.caseDetails.cynopsis_status;
    let hasWhitelistSetup  = this.appConfig.getClientSetup().has_whitelist_setup;

    if ( kyc_status == "denied") {
      this.alertStyleClass = "alert-danger";
      this.svgClass = "alert-error-svg";
      this.svgId = "#kyc-error-icon";
      if ( cynopsis_status == 'rejected'){
        this.alertMessage = "AML/CTF status denied, this case cannot be reopned";
      } else{
        this.alertMessage = "Case denied by Admin";
      }
    } else if ( kyc_status == "approved"){
      if (hasWhitelistSetup){
        let whitelistStatus = this.caseDetails.whitelist_status;
        if (whitelistStatus == 'unprocessed' || whitelistStatus == 'started'){
          this.alertStyleClass = "alert-warning";
          this.svgClass = "alert-warning-svg";
          this.svgId = "#kyc-pending-icon";
          this.alertMessage = "Case approved - whitelisting in progress";
        } else if (whitelistStatus == 'done' && this.caseDetails.whitelist_confirmation_pending){
          this.alertStyleClass = "alert-warning";
          this.svgClass = "alert-warning-svg";
          this.svgId = "#kyc-pending-icon";
          this.alertMessage = "Case approved - whitelisting done, awaiting confirmation";
        } else if (whitelistStatus == 'done' && ! this.caseDetails.whitelist_confirmation_pending){
          this.alertStyleClass = "alert-success";
          this.svgClass = "alert-success-svg";
          this.svgId = "#kyc-success-icon";
          this.alertMessage = "The case has been approved";
        } else if (whitelistStatus == 'failed'){
          this.alertStyleClass = "alert-warning";
          this.svgClass = "alert-warning-svg";
          this.svgId = "#kyc-warning-icon";
          this.alertMessage = "Case approved - whitelisting failed";
        }
      } else {
        this.alertStyleClass = "alert-success";
        this.svgClass = "alert-success-svg";
        this.svgId = "#kyc-success-icon";
        this.alertMessage = "The case has been approved";
      }

    } else if (kyc_status == "pending"){
      let adminStatus = this.caseDetails.admin_status;
      if (adminStatus == 'qualified'){
        this.alertStyleClass = "alert-warning";
        this.svgClass = "alert-warning-svg";
        this.svgId = "#kyc-pending-icon";
        this.alertMessage = "Case approved by admin and is awaiting AML/CTF action";

      } else{
        if (this.caseDetails.last_issue_email_sent_humanized.length > 0){
          this.alertStyleClass = "alert-warning";
          this.svgClass = "alert-warning-svg";
          this.svgId = "#kyc-warning-icon";
          this.alertMessage = "Issue reported - " + this.caseDetails.last_issue_email_sent_humanized +" email sent.";
        }

      }


    }

  }

  hideModal(){
    $("#detailsModal").modal('hide');
  }

  onSuccess( res ) {
    this.caseDetails = res.data.case_detail;


    this.userDetails = res.data.user_detail;
    this.ostAlert();
    this.userDetails['extraDiv'] = this.checkForOddSections();
    this.meta = res.data.meta;
    this.stateHandler.updateRequestStatus( this, false,  false);
    this.getNextPrevious(res.data.meta);
    this.showPageState();
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

}


