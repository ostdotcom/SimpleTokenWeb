import {Component, OnInit, Input, ɵelementEventFullName} from '@angular/core';
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
  @Input('amlUnMatchedIds') amlUnMatchedIds : Array< string >  = [];
  @Input('amlMatchedIds') amlMatchedIds : Array< string > = [] ;


  caseDetails : Object =  null ;
  amlDetail : Object = null;
  amlStatus : string = null ;
  amlProcessingStatus : string = null ;
  amlMatchesPresent : boolean = null;
  allNegativeMatches : boolean = false;
  amlMatchList : Array< any > = [] ;
  allAMLIds: Array<string> = [];

  ngOnInit() {
     this.caseDetails = this.utilitites.deepGet( this.response ,  "data.case_detail") || {};
     this.amlStatus = this.caseDetails['aml_status'];
     this.amlDetail = this.utilitites.deepGet( this.response ,  "data.aml_detail") || {};
     this.amlProcessingStatus = this.amlDetail['aml_processing_status'];

     //TODO this.amlMatchList = this.amlDetail['aml_matches']; uncomment this once service integration done
    this.amlMatchList = [{"qr_code": 123, "status":"no_match"},
      {"qr_code": 134, "status":"no_match"}, {"qr_code": 194, "status":"no_match"}];
    this.createMatchLists();
    this.allNegativeMatches = this.amlMatchList.length == this.amlUnMatchedIds.length;
    this.amlMatchesPresent = this.amlMatchList && this.amlMatchList.length > 0;
  }

  createMatchLists(){
    for(let match of this.amlMatchList) {
      let match_status = match['status'],
          match_qr_code = match['qr_code'];
      if( match_status == 'match' && this.amlMatchedIds.indexOf(match_qr_code) == -1 ){
        this.amlMatchedIds.push(match_qr_code);
      } else if( match_status == 'no_match' && this.amlUnMatchedIds.indexOf(match_qr_code) == -1 ) {
        this.amlUnMatchedIds.push(match_qr_code);
      }
      this.allAMLIds.push(match_qr_code);
    }
  }

  showAMLSection() {
    return (this.caseDetails['is_case_closed'] ||
      (this.amlProcessingStatus == 'processed' ||
        (this.amlProcessingStatus == 'processing' && this.caseDetails['admin_status'] == 'qualified')))
  }

  allNegativeMatchesPressed() {
    if(this.caseDetails['is_case_closed']){
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    this.allNegativeMatches = !this.allNegativeMatches;
    console.log("2------this.allNegativeMatches " , this.allNegativeMatches  );
    this.amlMatchedIds.splice(0,this.amlMatchedIds.length);
    this.amlUnMatchedIds.splice(0,this.amlUnMatchedIds.length);
    if(this.allNegativeMatches){
      this.amlUnMatchedIds.push(...this.allAMLIds);
    }
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

  getAMLMatchCount(){
    return this.amlMatchList.length;
  }

  amlActionTaken() {
    return (this.amlMatchedIds.length >0 || this.amlUnMatchedIds.length >0);
  }

  onOptionSelect( optionObj ){
    let value = optionObj && optionObj.value  ;
    if( value == 1 ){
      this.allNegativeMatches = false ;
    }
  }

}
