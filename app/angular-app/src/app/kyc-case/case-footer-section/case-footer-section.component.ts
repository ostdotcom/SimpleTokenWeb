import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'case-footer-section',
  templateUrl: './case-footer-section.component.html',
  styleUrls: ['./case-footer-section.component.scss']
})
export class CaseFooterSectionComponent implements OnInit {

  constructor( private utilitites : UtilitiesService ,
               public appConfig: AppConfigService, ) { }

  @Input('response') response : Object = null ; 
  @Input('showPageStateFn') showPageState : Function; 

  caseDetails : Object = null ; 
  amlDetail   : Object = null ; 
  amlStatus   : string = null ; 
  amlProcessingStatus : string = null ; 

  ngOnInit() {
    this.caseDetails = this.utilitites.deepGet( this.response ,  "data.case_detail") || {};
    this.amlStatus = this.caseDetails['aml_status'];  
    this.amlDetail = this.utilitites.deepGet( this.response ,  "data.aml_detail") || {}; 
    this.amlProcessingStatus = this.amlDetail['aml_processing_status']; 
  }



}
