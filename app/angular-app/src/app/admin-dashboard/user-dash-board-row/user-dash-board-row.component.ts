import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-dash-board-row',
  templateUrl: './user-dash-board-row.component.html',
  styleUrls: ['./user-dash-board-row.component.scss']
})
export class UserDashBoardRowComponent implements OnInit {

  constructor() { }

  @Input('row') row: any ;
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
    console.log("status changed -----", this.status);
  }


}
