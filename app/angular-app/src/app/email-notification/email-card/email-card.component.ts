import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'email-card',
  templateUrl: './email-card.component.html',
  styleUrls: ['./email-card.component.scss']
})
export class EmailCardComponent implements OnInit {

  @Input('adminList') adminList: Object = {};
  @Input('section') section: Object = {};
  @Input('sectionId') sectionId: string = '';
  @Input('postData') postData: Object = {};
  @Output('modified') modified : EventEmitter<boolean>= new EventEmitter<boolean>();

  sectionName : string = '';
  sectionKey : string = '';
  adminOrder: Array<string> = [];
  adminChecked : Array<string> = [];
  adminDisabled : Array<string> = [];

  constructor() { }

  ngOnInit() {
    if(!this.section) return;
    this.sectionName = this.section['display_text'];
    this.sectionKey = this.section['data_keyname'];
    this.adminOrder = this.section['order'];
    this.adminChecked = JSON.parse(JSON.stringify(this.section['checked']));
    this.adminDisabled = this.section['disabled'];
    this.postData[this.sectionKey] = this.adminChecked;
  }

  isChecked( value){
    if( this.adminChecked.indexOf(value) > -1 ){
      return true;
    }else{
      return false;
    }
  }

  onChange( value){
    let indexOf =  this.adminChecked.indexOf(value);
    if( indexOf > -1 ){
      this.adminChecked.splice( indexOf ,  1);
    }else{
      this.adminChecked.push( value );
    }
    this.modified.emit(true);
  }

  isDisabled( adminId ){
    return this.adminDisabled.indexOf(adminId) > -1;
  }

}
