import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../request-state-handler.service';
import {OstHttp} from '../ost-http.service';
import {TableComponent} from '../table/table.component';
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
    private http: OstHttp
  ) {}

  // Default parameters
  admin_status : any ;
  admin_action_status : any;
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

  // Defaults and filtersMap
  filtersMap: object = {
    'filters[admin_status]': 'admin_status',
    'filters[admin_action_types]': 'admin_action_status',
    'filters[cynopsis_status]': 'cynopsis_status',
    'filters[whitelist_status]': 'whitelist_status'
  };
  defaultQueryParams: object = {
    admin_status: 'all',
    admin_action_status: 'all',
    cynopsis_status: 'all',
    whitelist_status: 'all',
    sort_by: 'desc',
    page_number: 1
  };

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
    for (var key in this.filtersMap) {
      this[this.filtersMap[key]] =
      currentQueryParams[this.filtersMap[key]] ?
      currentQueryParams[this.filtersMap[key]] :
      this.defaultQueryParams[this.filtersMap[key]]
      console.log(this.filtersMap[key]);
    }
  }

  initSort(){
    var currentQueryParams = this.getQueryParams();
    this.sort_by =
    currentQueryParams['sort_by'] ?
    currentQueryParams['sort_by'] :
    this.defaultQueryParams['sort_by'];
  }

  initPagination(){
    var currentQueryParams = this.getQueryParams();
    this.page_number =
    currentQueryParams['page_number'] ?
    currentQueryParams['page_number'] :
    this.defaultQueryParams['page_number'];
  }

  onFilterChange( filtersForm ) {
    var filters = {};
    for (var key in this.filtersMap) {
      filters[this.filtersMap[key]] = filtersForm.value[key];
    }
    filters['page_number'] = 1;
    this.setQueryParams(filters);
  }

  onSortChange( sortForm ){
    var sort = {
      sort_by: sortForm.value['sortings[sort_by]']
    };
    sort['page_number'] = 1;
    this.setQueryParams(sort);
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
    console.log(this.getQueryParams());
    this.http.get(this.downloadURL,  this.params ).subscribe(
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
        // this.stateHandler.updateRequestStatus(this);
        // this.isMailSent = true;
        // $('#confirmation').modal('hide');
        // this.hideReportIssue();
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this , false , true,  false  , err );

      })
  }

  getParamsForDownloadCSV(params) {
     this.params = params;

  }



}
