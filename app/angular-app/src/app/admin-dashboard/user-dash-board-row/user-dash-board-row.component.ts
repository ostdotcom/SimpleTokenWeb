import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OstRowComponent } from '../../table/ost-row/ost-row.component';

declare var $:any;

@Component({
  selector: 'user-dash-board-row',
  templateUrl: './user-dash-board-row.component.html',
  styleUrls: ['../../table/ost-row/ost-row.component.scss', './user-dash-board-row.component.scss']
})
export class UserDashBoardRowComponent extends OstRowComponent implements OnInit {

  constructor() {
    super();
   }

  @Input('row') row: any ;
  @Output("resendInviteEvent") resendInviteEvent = new EventEmitter();
  @Output("resetMfaEvent") resetMfaEvent = new EventEmitter();

  entityPath: string;
  status: any;

  statusMap = {
    "active" : "Active",
    "invited" : "Invitation Sent"
  }

  ngOnInit() {
    if(this.row){
      this.entityPath = "entity_configs.admin_dashboard."+ this.row.status ;
    }
  }

  onStatusChange( $event ){
    switch( this.status ){
      case "delete":{
        this.onDelete(this.row);
        break;
      }
      case "resend":{
        this.resendInviteEvent.emit(this.row);
        break;
      }
      case "reset":{
        this.resetMfaEvent.emit(this.row);
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



}
