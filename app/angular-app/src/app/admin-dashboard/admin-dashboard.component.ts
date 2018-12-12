import { Component, AfterViewInit , ViewChild, OnInit} from '@angular/core';
import { TableComponent} from "../table/table.component";
import { PageBaseComponent } from '../page-base-component/page-base-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from '../services/app-config.service';

declare var $: any;

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent extends PageBaseComponent implements OnInit{

  @ViewChild(TableComponent) tableComponent;
  showInviteUser: boolean = false;
  user:any;

  constructor( activatedRoute: ActivatedRoute,
               router: Router, appConfigService: AppConfigService) {
    super( activatedRoute , router , appConfigService );
  }

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
  
  tempDeployFunction(){
    //Delete it whoever see's it first.
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
