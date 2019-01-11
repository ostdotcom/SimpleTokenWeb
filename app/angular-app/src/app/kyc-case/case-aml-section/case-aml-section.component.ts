import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';

declare var $: any;

@Component({
  selector: 'case-aml-section',
  templateUrl: './case-aml-section.component.html',
  styleUrls: ['./case-aml-section.component.scss']
})
export class CaseAmlSectionComponent implements OnInit {

  constructor(  private utilitites : UtilitiesService ) { }

  @Input('response') response : Object = null ;
  @Input('amlUnMatchedIds') amlUnMatchedIds : Array< string > ;
  @Input('amlMatchedIds') amlMatchedIds : Array< string > ;


  caseDetails : Object =  null ;
  amlDetail : Object = null;
  amlStatus : string = null ;
  amlProcessingStatus : string = null ;
  amlMatchesPresent : boolean = null;
  allNegativeMatches : boolean = false;
  amlMatchList : Array< any > = null ;
  allAMLIds: Array<string> = [];

  ngOnInit() {
     this.caseDetails = this.utilitites.deepGet( this.response ,  "data.case_detail") || {};
     this.amlStatus = this.caseDetails['aml_status'];
     this.amlDetail = this.utilitites.deepGet( this.response ,  "data.aml_detail") || {};
     this.amlProcessingStatus = this.amlDetail['aml_processing_status'];

     //TODO this.amlMatchList = this.amlDetail['aml_matches']; uncomment this once service integration done
    this.amlMatchList = [{"qr_code": 123, "status":""},{"qr_code": 134, "status":""}];
    for(let match of this.amlMatchList) {
      this.allAMLIds.push(match['qr_code']);
    }
    this.amlMatchesPresent = this.amlMatchList && this.amlMatchList.length > 0;

  }

  showAMLSection() {
    return (this.caseDetails['is_case_closed'] ||
      (this.amlProcessingStatus == 'processed' ||
        (this.amlProcessingStatus == 'processing' && this.caseDetails['admin_status'] == 'qualified')))
  }

  allNegativeMatchesPressed( event ){
    if(this.caseDetails['is_case_closed']){
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    this.allNegativeMatches = !this.allNegativeMatches;
    this.amlUnMatchedIds = JSON.parse(JSON.stringify(this.allAMLIds));
  }

  handleMatchSelection( amlMatchCode ){
    if(this.caseDetails['is_case_closed']){
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    let index = this.amlUnMatchedIds.indexOf(amlMatchCode);
    if (index > -1) {
      this.amlUnMatchedIds.splice(index, 1);
    }
    this.amlMatchedIds.push ( amlMatchCode );
    this.allNegativeMatches = false;
    $('.no-hit-btn').removeClass('active');  //TODO FLAGED BASED
  }

  handleNoMatchSelection( amlMatchCode ){
    if(this.caseDetails['is_case_closed']){
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    let index = this.amlMatchedIds.indexOf(amlMatchCode);
    if (index > -1) {
      this.amlMatchedIds.splice(index, 1);
    }
    this.amlUnMatchedIds.push( amlMatchCode );
  }

  getAMLStatusMsg(){
    if(this.caseDetails['is_case_closed']) {
      if(this.amlStatus == 'approved' || this.amlStatus == 'cleared') {
        if(this.amlMatchesPresent){
          return "The AML/CTF has been automatically approved."
        } else{
          return "The AML/CTF has been manually approved."
        }
      } else if( this.amlStatus == 'rejected') {
        return "The AML/CTF has been manually denied."
      } else{
        return this.getAMLMatchMsg();
      }
    } else{
      if(this.amlProcessingStatus == 'processing' && this.caseDetails['admin_status'] == 'qualified') {
        return "Awaiting AML/CTF data."
      } else{
        return this.getAMLMatchMsg();
      }
    }
  }

  getAMLMatchMsg(){
    if(this.amlMatchesPresent){
      return "AML/CTF Matches."
    } else{
      return "No matches found."
    }
  }

}
