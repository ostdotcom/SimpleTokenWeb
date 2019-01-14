import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'case-footer-section',
  templateUrl: './case-footer-section.component.html',
  styleUrls: ['./case-footer-section.component.scss']
})
export class CaseFooterSectionComponent implements OnInit {

  constructor( private utilities : UtilitiesService ,
               public appConfig: AppConfigService, ) { }

  @Input('response') response : Object = null ;
  @Input('showPageStateFn') showPageState : Function;
  @Input('amlUnMatchedIds') amlUnMatchedIds : Array< string > = null;
  @Input('amlMatchedIds') amlMatchedIds : Array< string > = null;

  caseDetails : Object = null ;
  amlDetail   : Object = null ;
  amlMatchList: Array<any>;
  amlMatchesPresent;
  adminStatus : string = null ;
  amlStatus   : string = null ;
  amlProcessingStatus : string = null ;

  ngOnInit() {
    this.caseDetails = this.utilities.deepGet( this.response ,  "data.case_detail") || {};
    this.adminStatus = this.caseDetails['admin_status']
    this.amlStatus = this.caseDetails['aml_status'];
    this.amlDetail = this.utilities.deepGet( this.response ,  "data.aml_detail") || {};
    this.amlProcessingStatus = this.amlDetail['aml_processing_status'];
    this.amlMatchList = this.amlDetail && this.amlDetail['aml_matches'] || [];
    this.amlMatchesPresent  = this.amlMatchList && this.amlMatchList.length > 0;
  }

  /**
   * AML status should be unproccessed
   * OR AML status should be processing && Admin status should not be qualified
   **/
  isTZeroState(){
    return this.amlProcessingStatus == "unprocessed" ||
    ( this.amlProcessingStatus == "processing" && this.adminStatus != "qualified" ) ;
  }

  /**
   * AML processing status should be processing && Admin status is qualified
   **/
  isPreTOneState(){
    return this.amlProcessingStatus == "processing" && this.adminStatus == "qualified";
  }

  /**
   * AML processing status should be processed && Admin status is qualified
   **/
  isTOneState(){
    return this.amlProcessingStatus == "processed" ;
  }

  amlActionTaken() {
    return (this.amlMatchedIds.length >0 || this.amlUnMatchedIds.length >0 );
  }


}
