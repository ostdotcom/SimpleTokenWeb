import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OstRowComponent } from '../../table/ost-row/ost-row.component';

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
    "invited" : "Invitation Send"
  }

  ngOnInit() {
    if(this.row){
      this.entityPath = "entity_configs.admin_dashboard."+ this.row.status ; 
    } 
  }

  onStatusChange(){
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
  }


}
