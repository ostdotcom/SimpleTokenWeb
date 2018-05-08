import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OstHttp } from '../ost-http.service';
import { RequestStateHandlerService } from '../request-state-handler.service';

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
  caseDetails: object = {};
  userDetails: object = {};
  meta: object = {};
  rData
  caseId;
  logUrl: string = '';
  duplicateDataUrl: string = '';
  constructor(
    private route: ActivatedRoute,
    private http: OstHttp,
    private stateHandler : RequestStateHandlerService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.caseId = params.get('id');
    this.logUrl = 'api/admin/kyc/kyc-action-logs/?id=' + params.get('id');
    this.duplicateDataUrl = 'api/admin/kyc/fetch-duplicate?id=' + params.get('id');
    this.fetchCase(params.get('id'));
    });
  }

  fetchCase(id) {
    this.isProcessing = true;
    this.http.get('api/admin/kyc/check-details/', {
      params: {
        id: id
      }
    }).subscribe( response => {
      this.onSuccess( response.json());
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

}
