import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityConfigService } from '../services/entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import {OstHttp} from '../services/ost-http.service';
import {TableComponent} from '../table/table.component';
import { AppConfigService } from '../services/app-config.service';
import { TableStateManagementService } from '../services/table-state-management.service';

declare var $: any;


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  @ViewChild(TableComponent) tableComponent;

  q: string;
  placeholder: string = 'Search By Email';
  user;

  defaultQueryParams: object = {
    'search[q]': '',
    'filters[kyc_submitted]': 'all',
    'sortings[sort_by]': 'desc',
    'page_number': 1
  };

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

  isWhitelistDisabled : boolean = false;

  constructor(
    private entityConfigService: EntityConfigService ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateHandler: RequestStateHandlerService,
    private http: OstHttp,
    public appConfigService: AppConfigService,
    private stateManage : TableStateManagementService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      this.stateManage.init( this );
     });
  }

  onFilterChange( filtersForm ) {
    this.stateManage.onFilterChange( filtersForm );
   }

  onSortChange( sortForm ){
    this.stateManage.onSortChange( sortForm );
  }

  onPageChange ( pageNumber ){
    this.stateManage.onPageChange( pageNumber );
  }

  onSearchSubmit(searchForm) {
    this.stateManage.onSearch( searchForm );
  }

  onDeleteRow( user ){
    this.user = user;
    if (this.user.whitelist_status == 'done'){
      this.postApi = 'api/admin/kyc/open-case';
      this.actionBtnPrimaryName =  "RE-OPEN";
      this.actionButtonClass = "case-reopen";
      this.message = "To delete a user who has already been qualified, you will need to reopen the case. Do you want to continue?";
      this.successMessage = "The case will be re-opened shortly. You will be able to delete the user once the case has been reopened."
      this.DataType = 'case_id';
    }
    else{
      this.postApi = 'delete_api';
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
