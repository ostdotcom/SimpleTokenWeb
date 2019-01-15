import { Component, OnInit, Input , EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import {UtilitiesService} from "../../services/utilities.service";

declare var $:any;

@Component({
  selector: 'aml-toggle',
  templateUrl: './aml-toggle.component.html',
  styleUrls: ['./aml-toggle.component.scss']
})
export class AmlToggleComponent implements OnInit {

  constructor(private utilities : UtilitiesService ) { }

  @Input('match') match: Object ;
  @Input('amlMatchedIds') amlMatchedIds: Array<string>;
  @Input('amlUnMatchedIds') amlUnMatchedIds: Array<string>;
  @Input('response') response: Object = null;
  @Input('allNegativeMatches') allNegativeMatches? : boolean;

  @Output('optionSelected') optionSelected : EventEmitter<any> = new EventEmitter<any>() ;

  caseDetails;
  qrCode;

  ngOnInit() {
    this.caseDetails = this.utilities.deepGet( this.response ,  "data.case_detail") || {};
    this.qrCode = this.match['qr_code'];
  }

  isMatch(){
    return (this.amlMatchedIds.indexOf(this.qrCode) > -1);
  }

  isNoMatch(){
    return (this.amlUnMatchedIds.indexOf(this.qrCode) > -1);
  }

  onSelect(  value ){
    this.removeFromMatchList( this.amlMatchedIds );
    this.removeFromMatchList( this.amlUnMatchedIds );

    if( value == 0 ){
      this.amlUnMatchedIds.push( this.qrCode );
    }
    else {
      this.amlMatchedIds.push( this.qrCode );
    }

    this.optionSelected.emit({
      qrCode : this.qrCode ,
      value : value
    })
  }

  removeFromMatchList( list ){
    let index = list.indexOf(this.match['qr_code']);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

}
