import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Injectable()
export class TableStateManagementService {

  constructor(private activatedRoute : ActivatedRoute , private router : Router){}
  context: any

  init( context ) {
    this.context = context; 
    this.initFilters();
    this.initSort();
    this.initSearch();
    this.initPagination();
    this.setQueryParams({});
    setTimeout(function(){
      $('.selectpicker').selectpicker('render');
    },  0)
  }

  initFilters(){
    if( !this.context.filterKeys ) return ; 
    let context = this.context ,
        currentQueryParams = this.getQueryParams()
    ;
    for (var i = 0; i < context.filterKeys.length; i++) {
      context[context.filterKeys[i]] = currentQueryParams['filters['+context.filterKeys[i]+']'] 
                                    || context.defaultQueryParams['filters['+context.filterKeys[i]+']'];
    }
  }

  initSort(){
    if( !this.context.sortKeys ) return ; 
    let context = this.context, 
        currentQueryParams = this.getQueryParams()
    ;
    for (var i = 0; i < context.sortKeys.length; i++) {
      context[context.sortKeys[i]] = currentQueryParams['sortings['+context.sortKeys[i]+']'] 
                                   || context.defaultQueryParams['sortings['+context.sortKeys[i]+']'];
    }
  }

  initSearch() {
    let context = this.context , 
        currentQueryParams = this.getQueryParams()
    ;
    context.q = currentQueryParams['search[q]'] || context.defaultQueryParams['search[q]'];
  }

  initPagination(){
    let context = this.context,
        currentQueryParams = this.getQueryParams()
    ;
    context.page_number = currentQueryParams['page_number'] || context.defaultQueryParams['page_number'];
  }

  onFilterChange( filtersForm ) {
    if(!filtersForm ) return ; 
    let filters = {
      'page_number': 1
    };
    Object.assign(filters, filtersForm.value);
    this.setQueryParams(filters);
  }

  onSortChange( sortForm ){
    if(!sortForm ) return ; 
    let sortings = {
      'page_number': 1
    };
    Object.assign(sortings, sortForm.value);
    this.setQueryParams(sortings);
  }

  onSearch(searchForm) {
    if( !searchForm ) return ; 
    let searchValue = {}; 
    Object.assign(searchValue, searchForm.value);
    this.setQueryParams(searchValue);
  }

  onPageChange ( pageNumber ){
    if(!pageNumber ) return ; 
    let page = {
      page_number: pageNumber
    };
    this.setQueryParams(page);
  }

  getQueryParams(){
    return Object.assign({}, this.activatedRoute.snapshot.queryParams);
  }

  setQueryParams(params){
    let context = this.context,
        currentQueryParams = this.getQueryParams(),
        newQueryParams ={}
    ;
    if(Object.keys(currentQueryParams).length === 0 && currentQueryParams.constructor === Object){
       newQueryParams = Object.assign(context.defaultQueryParams, params);
    } else {
       newQueryParams = Object.assign(currentQueryParams, params);
    }
    this.router.navigate([], { queryParams: newQueryParams });
  }

}
