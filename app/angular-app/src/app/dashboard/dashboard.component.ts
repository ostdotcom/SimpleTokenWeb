import { Component, OnInit } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( 
    private entityConfigService : EntityConfigService ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  // Default parameters
  adminStatus : any ;
  admimActionStatus : any;
  cynopsisStatus: any;
  whiteListStatus: any;
  sortBy : any;
  pageNumber: number;

  // Defaults and filtersMap
  filtersMap: object = {
    'filters[admin_status]': 'adminStatus',
    'filters[admin_action_types]': 'admimActionStatus',
    'filters[cynopsis_status]': 'cynopsisStatus',
    'filters[whitelist_status]': 'whiteListStatus'
  };
  defaultQueryParams: object = {
    adminStatus: 'all',
    admimActionStatus: 'all',
    cynopsisStatus: 'all',
    whiteListStatus: 'all',
    sortBy: 'desc',
    pageNumber: 1
  };

  ngOnInit() {
    this.initFilters();
    this.initSort();
    this.initPagination();
  }

  initFilters(){
    var currentQueryParams = this.getQueryParams();
    for (var key in this.filtersMap) {
      this[this.filtersMap[key]] = 
      currentQueryParams[this.filtersMap[key]] ? 
      currentQueryParams[this.filtersMap[key]] : 
      this.defaultQueryParams[this.filtersMap[key]]
    }
  }

  initSort(){
    var currentQueryParams = this.getQueryParams();
    this.sortBy = 
    currentQueryParams['sortBy'] ? 
    currentQueryParams['sortBy'] : 
    this.defaultQueryParams['sortBy'];
  }

  initPagination(){
    var currentQueryParams = this.getQueryParams();
    this.pageNumber = 
    currentQueryParams['pageNumber'] ? 
    currentQueryParams['pageNumber'] : 
    this.defaultQueryParams['pageNumber'];
  }

  onFilterChange( filtersForm ) {
    var filters = {};
    for (var key in this.filtersMap) {
      filters[this.filtersMap[key]] = filtersForm.value[key];
    }
    filters['pageNumber'] = 1;
    this.setQueryParams(filters);
  }

  onSortChange( sortForm ){
    var sort = {
      sortBy: sortForm.value['sortings[sort_by]']
    };
    sort['pageNumber'] = 1;
    this.setQueryParams(sort);
  }

  onPageChange ( pageNumber ){
    var page = {
      pageNumber: pageNumber
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

}
