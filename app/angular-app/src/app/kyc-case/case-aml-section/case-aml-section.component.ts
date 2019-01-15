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
  @Input('amlUnMatchedIds') amlUnMatchedIds : Array< string > = this.amlUnMatchedIds || [] ;
  @Input('amlMatchedIds') amlMatchedIds : Array< string > = this.amlMatchedIds || []  ;


  caseDetails : Object =  null ;
  amlDetail : Object = null;
  amlStatus : string = null ;
  amlProcessingStatus : string = null ;
  amlMatchesPresent : boolean = null;
  allNegativeMatches : boolean = false;
  amlMatchList : Array< any > = [] ;
  adminStatus: string = null;

  ngOnInit() {
      this.caseDetails = this.utilitites.deepGet( this.response ,  "data.case_detail") || {};
      this.amlStatus = this.caseDetails && this.caseDetails['aml_status'];
      this.adminStatus = this.caseDetails && this.caseDetails['admin_status'];
      this.amlDetail = this.utilitites.deepGet( this.response ,  "data.aml_detail") || {};
      this.amlProcessingStatus = this.amlDetail && this.amlDetail['aml_processing_status'];
      this.amlMatchList = this.amlDetail && this.amlDetail['aml_matches'] || [];
      this.allNegativeMatches = this.amlMatchList.length == this.amlUnMatchedIds.length;
      this.amlMatchesPresent  = this.amlMatchList && this.amlMatchList.length > 0;
  }

  showAMLSection() {
    return (this.amlProcessingStatus != 'unprocessed')
  }

  allNegativeMatchesPressed() {
    if(!this.allNegativeMatches) {
      this.allNegativeMatches = true;
      this.amlMatchedIds.splice(0,this.amlMatchedIds.length) ;
      this.amlUnMatchedIds.splice(0,this.amlUnMatchedIds.length) ;
      let qrCode = "";
      for(let cnt = 0 ; cnt < this.amlMatchList.length  ; cnt++ ){
        qrCode = this.amlMatchList[cnt]['qr_code'] ;
        if(  this.amlUnMatchedIds.indexOf( qrCode ) < 0  ){
          this.amlUnMatchedIds.push( qrCode );
        }
      }
    }
  }

  getAMLStatusMsg() {

    if (this.amlStatus == 'cleared') {
      return "The AML/CTF has been automatically approved.";
    } else if (this.amlStatus == 'approved') {
      return "The AML/CTF has been manually approved.";
    } else if (this.amlStatus == 'denied') {
      return "The AML/CTF has been manually denied.";
    } else {
      if (this.amlProcessingStatus == 'processing') {
        return "Awaiting AML/CTF data.";
      } else if (this.amlProcessingStatus == 'processed') {
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
    return (this.amlMatchedIds.length >0 || this.amlUnMatchedIds.length >0 );
  }

  onOptionSelect( optionObj ){
    let value = optionObj && optionObj.value  ;
    if( value == 1 ){
      this.allNegativeMatches = false ;
    } else  if(this.amlUnMatchedIds.length == this.amlMatchList.length){
      this.allNegativeMatches = true ;
    }
  }

}
