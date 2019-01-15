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

  entityPath: string;
  status: any;
  jUpdateEthAddressModal :any = $('#updateEthAddressModal');

  ngOnInit() {
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip();
    },0);
    if(this.row){
      this.entityPath = "entity_configs.user_management_dashboard.actions" ;
    }
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
      return "Cannot delete a user or update ethereum address when whitelisting has started. Please try again once the process is complete.";
    }
  }

  onStatusChange( $event ){
    switch( this.status ){
      case "delete":{
        this.deleteUser();
        break;
      }
      case "update_eth_addr":{
        this.onUpdateEthAddr();
        break;
      }
    }
    this.resetSelectpicker( $event )
  }

  resetSelectpicker( $event  ){
    let jEl = $($event.target);
    jEl.val('default');
    jEl.selectpicker("refresh");
  }

  deleteUser( ){
    this.deleteRowEvent.emit(this.row);
  }

  onUpdateEthAddr(  ) {
    this.jUpdateEthAddressModal.modal('show');
  }

}
