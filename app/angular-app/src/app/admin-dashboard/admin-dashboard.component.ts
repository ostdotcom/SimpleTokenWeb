import { Component, AfterViewInit , ViewChild} from '@angular/core';
import { TableComponent} from "../table/table.component";


@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements AfterViewInit {

  constructor() { }

  showInviteUser: boolean = false;
  @ViewChild(TableComponent) tableComponent;

  ngAfterViewInit() {
  }

  hideInviteUserSection(){
    this.showInviteUser = false;
  }

  showInviteUserSection(){
    this.showInviteUser = true;
  }

  onDeleteRow( data ){
 
  }

  onResendInvite( data ){
   
  }

  onResetMfa( data ){
   
  }

}
