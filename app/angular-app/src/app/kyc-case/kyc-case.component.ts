import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OstHttp } from '../ost-http.service';

@Component({
  selector: 'app-kyc-case',
  templateUrl: './kyc-case.component.html',
  styleUrls: ['./kyc-case.component.scss']
})
export class KycCaseComponent implements OnInit {

  isProcessing: boolean = false;
  caseDetails: object = {};
  userDetails: object = {};
  meta: object = {};

  constructor(
    private route: ActivatedRoute,
    private http: OstHttp
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fetchCase(params.get('id'))
    });
  }

  fetchCase(id) {
    this.isProcessing = true;
    this.http.get('api/admin/kyc/check-details', {
      params: {
        id: id
      }
    }).subscribe( response => {
      this.onSuccess( response.json());
    }, error => {

    })
  }

  onSuccess( res ){
    this.isProcessing = false;
    this.caseDetails = res.data.case_detail;
    this.userDetails = res.data.user_detail;
    this.meta = res.data.meta;
  }

}
