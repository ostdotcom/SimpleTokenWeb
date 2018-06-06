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
  caseDetails: object = {};
  userDetails: object = {};
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
    private appConfig : AppConfigService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.caseId = params.get('id');
      this.fetchCase();
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

  onSuccess( res ) {
    this.caseDetails = res.data.case_detail;


    this.userDetails = res.data.user_detail;
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


