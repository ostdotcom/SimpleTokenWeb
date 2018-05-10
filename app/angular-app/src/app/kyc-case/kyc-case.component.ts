import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OstHttp } from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'app-kyc-case',
  templateUrl: './kyc-case.component.html',
  styleUrls: ['./kyc-case.component.scss']
})
export class KycCaseComponent implements OnInit {

  isProcessing: boolean = true;
  hasError: boolean = false;
  showCase: boolean = true;
  showReportIssue: boolean = false;
  showUpdateEth: boolean = false;
  isInitDuplicateTable:boolean = false;
  isInitLogTabel:boolean = false;
  caseDetails: object = {};
  userDetails: object = {};
  meta: object = {};
  rData
  caseId;
  isStatusDenied :boolean =  false ;
  isReportIssue :boolean = false ;
  isWhitelisting:boolean =  false;

  constructor(
    private activatedRoute: ActivatedRoute,
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

  fetchCase() {
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

  onSuccess( res ){
    this.caseDetails = res.data.case_detail;
    this.userDetails = res.data.user_detail;
    this.meta = res.data.meta;
    this.stateHandler.updateRequestStatus( this, false,  false);
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

  onActionSuccess(){
    this.fetchCase();
  }

  initDuplicateTable(){
    this.isInitDuplicateTable =true;
  }

  initLogTabel(){
    this.isInitLogTabel =true;
  }

}
