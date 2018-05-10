import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestOptions } from '@angular/http';
import { OstHttp } from '../ost-http.service';
import { RequestStateHandlerService } from '../request-state-handler.service';
import { AppConfigService } from '../app-config.service';

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
  filters: object = {
    admin_status: 'qualified',
    admin_action_status: 'all',
    cynopsis_status: 'all',
    whitelist_status: 'all'
  };
  sortings: object = {
    sort_by: 'desc'
  };


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
    var options = {
      params: {
        id: this.caseId,
        filters: this.getFilters(),
        sortings: this.getSortings()
      }
    }
    var requestOptions = new RequestOptions(options);
    this.http.get('api/admin/kyc/check-details/', requestOptions).subscribe( response => {
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

  getFilters(){
    var currentQueryParams = this.activatedRoute.snapshot.queryParams;
    var currentFilters = {};
    for (var key in this.filters) {
      if(currentQueryParams[key]){
        currentFilters[key] = currentQueryParams[key];
      }
    }
    return currentFilters;
  }

  getSortings(){
    var currentQueryParams = this.activatedRoute.snapshot.queryParams;
    var currentSortings = {};
    for (var key in this.sortings) {
      if(currentQueryParams[key]){
        currentSortings[key] = currentQueryParams[key];
      }
    }
    return currentSortings;
  }

  initDuplicateTable(){
    this.isInitDuplicateTable =true; 
  }

  initLogTabel(){
    this.isInitLogTabel =true; 
  }

}
