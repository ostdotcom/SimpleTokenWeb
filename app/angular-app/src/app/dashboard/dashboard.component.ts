import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../request-state-handler.service';
import {OstHttp} from '../ost-http.service';
import {TableComponent} from '../table/table.component';
import { AppConfigService } from '../app-config.service';

declare var $: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../table/table.component.scss' ]
})
export class DashboardComponent implements OnInit {

  @ViewChild(TableComponent) table;


  constructor(
    private entityConfigService: EntityConfigService ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateHandler: RequestStateHandlerService,
    private http: OstHttp,
    public appConfigService : AppConfigService
  ) {}

  // Default parameters
  admin_status : any ;
  admin_action_types : any;
  cynopsis_status: any;
  whitelist_status: any;
  sort_by : any;
  page_number: number;
  isCSVDownloaded = false;
  securityCheckbox: boolean = false;
  securityEthCheckbox: boolean =false;
  checkboxError = '';
  downloadURL = 'api/admin/kyc/get-kyc-report';
  successMessage;
  errorMessage;
  params;

  // Defaults, filterKeys, sortKeys
  defaultQueryParams: object = {
    'filters[admin_status]': 'all',
    'filters[admin_action_types]': 'all',
    'filters[cynopsis_status]': 'all',
    'filters[whitelist_status]': 'all',
    'sortings[sort_by]': 'desc',
    page_number: 1
  };
  filterKeys: Array<any> = ['admin_status','admin_action_types','cynopsis_status','whitelist_status'];
  sortKeys: Array<any> = ['sort_by'];

  ngOnInit() {
    this.initFilters();
    this.initSort();
    this.initPagination();
    this.setQueryParams({});

    $('#confirmDownload').off('hidden.bs.modal').on('hidden.bs.modal', () => {
      this.stateHandler.updateRequestStatus(this);
      this.checkboxError = '';
      this.isCSVDownloaded = false;
    });
  }

  initFilters(){
    var currentQueryParams = this.getQueryParams();
    for (var i = 0; i < this.filterKeys.length; i++) {
      this[this.filterKeys[i]] =
      currentQueryParams['filters['+this.filterKeys[i]+']'] ?
      currentQueryParams['filters['+this.filterKeys[i]+']'] :
      this.defaultQueryParams['filters['+this.filterKeys[i]+']']
    }
  }

  initSort(){
    var currentQueryParams = this.getQueryParams();
    for (var i = 0; i < this.sortKeys.length; i++) {
      this[this.sortKeys[i]] =
      currentQueryParams['sortings['+this.sortKeys[i]+']'] ?
      currentQueryParams['sortings['+this.sortKeys[i]+']'] :
      this.defaultQueryParams['sortings['+this.sortKeys[i]+']']
    }
  }

  initPagination(){
    var currentQueryParams = this.getQueryParams();
    this.page_number =
    currentQueryParams['page_number'] ?
    currentQueryParams['page_number'] :
    this.defaultQueryParams['page_number'];
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

  validateAndDownload(){
    if ( this.securityEthCheckbox && this.securityCheckbox){
      this.downloadCSV();

    }else {
      this.checkboxError = 'Please confirm conditions';
    }
    console.log(this.securityEthCheckbox, this.securityCheckbox);

  }

  downloadCSV() {
    this.stateHandler.updateRequestStatus(this ,  true );
    this.http.get(this.downloadURL,  this.getQueryParams() ).subscribe(
      response => {
        let res = response.json();
        if (!res.success) {
          this.stateHandler.updateRequestStatus(this , false , true,  false  , res );
          return;
        }
        this.stateHandler.updateRequestStatus(this);
        this.isCSVDownloaded = true;
        this.successMessage  = res.data.success_message;
        console.log(res);
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this , false , true,  false  , err );

      })
  }




}
