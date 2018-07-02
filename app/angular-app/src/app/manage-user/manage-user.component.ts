import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityConfigService } from '../services/entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import {OstHttp} from '../services/ost-http.service';
import {TableComponent} from '../table/table.component';
import { AppConfigService } from '../services/app-config.service';
import { PageBaseComponent } from '../page-base-component/page-base-component.component';

declare var $: any;


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent extends PageBaseComponent implements OnInit {

  @ViewChild(TableComponent) tableComponent;

  q: string;
  placeholder: string = 'Search By Email';
  user;

  filterKeys: Array<any> = [ 'kyc_submitted'];
  sortKeys: Array<any> = ['sort_by'];

  page_number: number;
  postApi: string;
  actionBtnPrimaryName: string;
  actionButtonClass: string;
  message: string;
  successMessage: string;
  DataType: string;
  kyc_submitted: string;
  whitelist_status: string;
  sort_by: string;

  constructor(
    private entityConfigService: EntityConfigService ,
    private stateHandler: RequestStateHandlerService,
    private http: OstHttp,
    public appConfigService: AppConfigService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super( activatedRoute , router);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      this.initFilters();
      this.initSort();
      this.initSearch();
      this.initPagination();
      this.setQueryParams({});
      setTimeout(function(){
        $('.selectpicker').selectpicker('render');
      },  0)
     });
  }

  onDeleteRow( user ){
    this.user = user;
    let performAction = this.user && this.user.action_to_perform || [];

    if (performAction.includes('reopen')){
      this.postApi = 'api/admin/kyc/open-case';
      this.actionBtnPrimaryName =  "RE-OPEN";
      this.actionButtonClass = "case-reopen";
      this.message = "To delete a user who has already been qualified, you will need to reopen the case. Do you want to continue?";
      this.successMessage = "The case will be re-opened shortly. You will be able to delete the user once the case has been reopened."
      this.DataType = 'case_id';

    }else if(performAction.includes('delete')){
      this.postApi = 'api/admin/users/delete-user';
      this.actionBtnPrimaryName =  "DELETE";
      this.actionButtonClass = "delete-user";
      this.message = "Attention! You are about to delete this user. This action is permanent and cannot be undone. Are you sure you want to continue?";
      this.successMessage = "User Deleted";
      this.DataType = 'user_id';
    }
    $('#deleteUserModal').modal('show');
  }

  onDeleteRowSucces(e){
    this.tableComponent.getTableData();
  }

}
