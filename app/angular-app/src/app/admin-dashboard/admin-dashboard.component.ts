import { Component, AfterViewInit , ViewChild, OnInit} from '@angular/core';
import { TableComponent} from "../table/table.component";
import { PageBaseComponentComponent } from '../page-base-component/page-base-component.component';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any; 

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent extends PageBaseComponentComponent implements OnInit{

  constructor( activatedRoute: ActivatedRoute,
               router: Router,) { 
    super( activatedRoute , router); 
  }

  showInviteUser: boolean = false;
  user:any; 
  @ViewChild(TableComponent) tableComponent;

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      this.initPagination();
      this.setQueryParams({});
     });
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
