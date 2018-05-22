import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-base-component',
  templateUrl: './page-base-component.component.html',
  styleUrls: ['./page-base-component.component.scss']
})

export class PageBaseComponentComponent {

  constructor( public activatedRoute: ActivatedRoute ,  public router: Router) {}

  private gobalDefault:object = {
    filter      : "all",
    sort        : 'desc',
  }

  /*
   * Overwrite exapmple start
   * defaultQueryParams {
   *    'search[q]': 'test',
   *    'filters[kyc_submitted]': 'all',
   *    'filters[admin_status]': 'reviewed',
   *    'sortings[sort_by]': 'desc',
   *    'page_number': 1
   * }
   */

  defaultQueryParams: object = { };

  /*
   * Options for filter and sort example start
   * filterKeys: Array<any> = ['admin_status','admin_action_types','cynopsis_status','whitelist_status'];
   * sortKeys: Array<any> = ['sort_by'];
  */

  filterKeys  : Array<any> = null;
  sortKeys    : Array<any> = null;
  page_number : number = null;
  q           : string = null ;

  initFilters() {
    if( !this.filterKeys ) return ;
    let currentQueryParams = this.getQueryParams(),
        filterKey , stateParam , defaultParam
    ;
    for (var i = 0; i < this.filterKeys.length; i++) {
      filterKey       = this.filterKeys[i];
      stateParam      = currentQueryParams['filters['+filterKey+']'];
      defaultParam    = this.defaultQueryParams['filters['+filterKey+']'];
      this[filterKey] = stateParam || defaultParam || this.gobalDefault['filter'];
    }
  }

  initSort() {
    if( !this.sortKeys ) return ;
    let currentQueryParams = this.getQueryParams(),
        sortKey , stateParam , defaultParam
    ;
    for (var i = 0; i < this.sortKeys.length; i++) {
      sortKey       = this.sortKeys[i];
      stateParam    = currentQueryParams['sortings['+sortKey+']'];
      defaultParam  = this.defaultQueryParams['sortings['+sortKey+']'];
      this[sortKey] = stateParam || defaultParam || this.gobalDefault['sort'];
    }
  }

  initSearch() {
    let currentQueryParams = this.getQueryParams()
    ;
    this.q = currentQueryParams['search[q]'] ;
  }

  initPagination(){
    let currentQueryParams = this.getQueryParams()
    ;
    this.page_number = currentQueryParams['page_number'] || 1;
  }

  onFilterChange( filtersForm ) {
    if(!filtersForm ) return ;
    let filters = {
      'page_number': 1
    };
    Object.assign(filters, filtersForm.value);
    this.setQueryParams(filters);
  }

  onSortChange( sortForm ) {
    if(!sortForm ) return ;
    let sortings = {
      'page_number': 1
    };
    Object.assign(sortings, sortForm.value);
    this.setQueryParams(sortings);
  }

  onSearch(searchForm) {
    if( !searchForm ) return ;
    let searchValue = {
      'page_number': 1
    };
    Object.assign(searchValue, searchForm.value);
    this.setQueryParams(searchValue);
  }

  resetSearch( searchInput ){
    if( !searchInput ) return ; 
    let value = searchInput.model, 
        name  = searchInput.name, 
        param = {}
    ; 
    param[name]= value;
    if(!value.trim()){
      this.setQueryParams(param);
    }
  }

  onPageChange ( pageNumber ) {
    if(!pageNumber ) return ;
    let page = {
      page_number: pageNumber
    };
    this.setQueryParams(page);
  }

  getQueryParams() {
    return Object.assign({}, this.activatedRoute.snapshot.queryParams);
  }

  setQueryParams(params) {
    let currentQueryParams = this.getQueryParams(),
        newQueryParams ={}
    ;
    if(Object.keys(currentQueryParams).length === 0 && currentQueryParams.constructor === Object){
       newQueryParams = Object.assign(this.getDefaultQueryParams(), params);
    } else {
       newQueryParams = Object.assign(currentQueryParams, params);
    }
    this.router.navigate([], { queryParams: newQueryParams });
  }

  getDefaultQueryParams() : object {
   let queryParams: object= {};
    if( this.filterKeys ){
      Object.assign(queryParams , this.getDefaultFilter());
    }
    if( this.sortKeys ){
      Object.assign(queryParams , this.getDefaultSort());
    }
    if( this.page_number ){
      queryParams['page_number'] = this.page_number;
    }
    if( this.q ){
      queryParams['search[q]'] = this.q;
    }

    return queryParams;
  }

  getDefaultFilter() :object {
    let filters:object =  {},
        filterKey , defaultParam
    ;
    for (var i = 0; i < this.filterKeys.length; i++) {
      filterKey     = this.filterKeys[i];
      defaultParam  = this.defaultQueryParams['filters['+filterKey+']'];
      filters['filters['+filterKey+']']  = defaultParam || this.gobalDefault['filter'];
    }
    return filters;
  }

  getDefaultSort() : object{
    let sortings:object = {},
        sortKey , defaultParam
    ;
    for (var i = 0; i < this.sortKeys.length; i++) {
      sortKey       = this.sortKeys[i];
      defaultParam  = this.defaultQueryParams['sortings['+sortKey+']'];
      sortings['sortings['+sortKey+']'] = defaultParam || this.gobalDefault['sort'];
    }
    return sortings;
  }

}
