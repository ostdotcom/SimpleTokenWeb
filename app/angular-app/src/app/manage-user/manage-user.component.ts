import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityConfigService } from '../services/entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import {OstHttp} from '../services/ost-http.service';
import {TableComponent} from '../table/table.component';
import { AppConfigService } from '../services/app-config.service';

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
    'filters[whitelist_status]': 'all',
    'sortings[sort_by]': 'desc',
    page_number: 1
  };

  filterKeys: Array<any> = [ 'kyc_submitted', 'whitelist_status'];
  sortKeys: Array<any> = ['sort_by'];
  page_number: number;
  postApi: string;
  actionBtnPrimaryName: string;
  actionButtonClass: string;
  message: string;

  constructor(
    private entityConfigService: EntityConfigService ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateHandler: RequestStateHandlerService,
    private http: OstHttp,
    public appConfigService: AppConfigService
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      this.initFilters();
      this.initSort();
      this.initSearch();
      this.initPagination();

      this.setQueryParams({});
      setTimeout(function(){
        $('.selectpicker').selectpicker('render');
      }, 0);
    });

  }

  initFilters() {

    var currentQueryParams = this.getQueryParams();
    for (var i = 0; i < this.filterKeys.length; i++) {
      this[this.filterKeys[i]] =
      currentQueryParams['filters['+this.filterKeys[i]+']'] ?
      currentQueryParams['filters['+this.filterKeys[i]+']'] :
      this.defaultQueryParams['filters['+this.filterKeys[i]+']'];
    }
    console.log('Inside init filters',  this);
  }

  initSort() {
    var currentQueryParams = this.getQueryParams();
    for (var i = 0; i < this.sortKeys.length; i++) {
      this[this.sortKeys[i]] =
      currentQueryParams['sortings['+this.sortKeys[i]+']'] ?
      currentQueryParams['sortings['+this.sortKeys[i]+']'] :
      this.defaultQueryParams['sortings['+this.sortKeys[i]+']']
    }
  }

  initSearch() {
    var currentQueryParams = this.getQueryParams();
    console.log('initSearch', currentQueryParams );
    this.q = currentQueryParams['search[q]'] ? currentQueryParams['search[q]'] : this.defaultQueryParams['search[q]'];
  }

  initPagination() {
    var currentQueryParams = this.getQueryParams();
    this.page_number =
    currentQueryParams['page_number'] ?
    currentQueryParams['page_number'] :
    this.defaultQueryParams['page_number'];
  }

  onSearch(filtersForm) {
    for (let key in filtersForm.value){

    }
    this.onFilterChange(filtersForm);
    console.log(filtersForm, filtersForm.value);
  }


  onFilterChange( filtersForm ) {
    var filters = {
      'page_number': 1
    };
    Object.assign(filters, filtersForm.value);
    this.setQueryParams(filters);
  }

  onSortChange( sortForm ){
    var sortings = {
      'page_number': 1
    };
    Object.assign(sortings, sortForm.value);
    this.setQueryParams(sortings);
  }

  onPageChange ( pageNumber ){
    var page = {
      page_number: pageNumber
    };
    this.setQueryParams(page);
  }

  getQueryParams(){
    return Object.assign({}, this.activatedRoute.snapshot.queryParams);
  }

  setQueryParams(params){
    var currentQueryParams = this.getQueryParams();
    if(Object.keys(currentQueryParams).length === 0 && currentQueryParams.constructor === Object){
      var newQueryParams = Object.assign(this.defaultQueryParams, params);
    } else {
      var newQueryParams = Object.assign(currentQueryParams, params);
    }
    this.router.navigate([], { queryParams: newQueryParams });
  }

  onSearchSubmit(searchForm) {
    console.log(searchForm.value);
    console.log('Hey I am here');
    var filters = {
      'page_number': 1
    };
    Object.assign(filters, searchForm.value);
    this.setQueryParams(filters);

  }

  onDeleteRow( user ){
    this.user = user;
    if (this.user.whitelist_status == 'done'){
      this.postApi = 'case_reopen_api';
      this. actionBtnPrimaryName =  "RE-OPEN CASE";
      this.actionButtonClass = "case-reopen";
      this.message = "To delete a user who has already been qualified, you will need to reopen the case. Do you want to continue?";

    }
    else{
      this.postApi = 'delete_api';
      this. actionBtnPrimaryName =  "DELETE USER";
      this.actionButtonClass = "delete-user";
      this.message = "Attention! You are about to delete this user. This action is permanent and cannot be undone. Are you sure you want to continue?";

    }
    $('#deleteUserModal').modal('show');
  }

  onDeleteRowSucces(e){
    console.log(e);
    this.tableComponent.getTableData();
  }



}
