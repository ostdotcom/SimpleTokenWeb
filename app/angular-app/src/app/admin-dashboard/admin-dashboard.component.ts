import { Component, AfterViewInit , ViewChild} from '@angular/core';
import { TableComponent} from "../table/table.component";

declare var $: any; 

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements AfterViewInit {

  constructor() { }

  showInviteUser: boolean = false;
  user:any; 
  @ViewChild(TableComponent) tableComponent;

  ngAfterViewInit() {
  }

  hideInviteUserSection(){
    this.showInviteUser = false;
  }

  showInviteUserSection(){
    this.showInviteUser = true;
  }

  onDeleteRow( user ){
    this.user = user; 
    $('.modal').modal('hide'); 
    $('#deleteAdminUserModal').modal('show'); 
  }

  onResendInvite( user ){
    this.user = user; 
    $('.modal').modal('hide'); 
    $('#resendInviteModal').modal('show'); 
  }

  onResetMfa( user ){
    this.user = user;
    $('.modal').modal('hide'); 
    $('#resetMfaModal').modal('show');  
  }

  onDeleteRowSucces( user ){
    this.tableComponent.onDeleteRowSuccess( user['id']); 
  }

  onResendInviteSucces( user ){

  }

  onResetMfaSucces( user ) {

  }

}
