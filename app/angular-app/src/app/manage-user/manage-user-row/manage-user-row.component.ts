import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';


declare var $: any;

@Component({
  selector: 'manage-user-row',
  templateUrl: './manage-user-row.component.html',
  styleUrls: ['../../table/ost-row/ost-row.component.scss',  './manage-user-row.component.scss']
})
export class ManageUserRowComponent implements OnInit {

  @Output("deleteRowEvent") deleteRowEvent = new EventEmitter();
  @Input() row;
  constructor(public appConfigService: AppConfigService) { }

  ngOnInit() {
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip();
    },0);
  }

  deleteUser(){
    this.deleteRowEvent.emit(this.row);
  }

  isDeleteUser():boolean{
    return this.isReopenInprocess() || this.isWhitelistPending(); 
  }

  isReopenInprocess():boolean{
    let performAction = this.row && this.row.action_to_perform || [];
    if(performAction.includes('case_reopen_inprocess') ){
      return true; 
    }
    return false; 
  }

  isWhitelistPending():boolean{
    let performAction = this.row && this.row.action_to_perform || [];
    if(performAction.includes('whitelist_confirmation_pending') ){
      return true; 
    }
    return false; 
  }

  getTooltipMsg():string{
    if(this.isReopenInprocess()){
      return "Case reopening is in process. Please wait to delete user.";
    }else if(this.isWhitelistPending()){
      return "Whitelist confirmation is pending. Please wait to delete user.";
    }
  }

}
