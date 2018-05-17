import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-base-component',
  templateUrl: './page-base-component.component.html',
  styleUrls: ['./page-base-component.component.scss']
})

export class PageBaseComponentComponent {

  constructor( public activatedRoute: ActivatedRoute ,  public router: Router) {}

  defaultQueryParams: object = {
    'page_number': 1,
  }; 

  filterKeys: Array<any>;
  sortKeys: Array<any>; 
  page_number:number; 
  q:string;

  initFilters(){
    if( !this.filterKeys ) return ;
    let currentQueryParams = this.getQueryParams()
    ;
    for (var i = 0; i < this.filterKeys.length; i++) {
      this[this.filterKeys[i]] = currentQueryParams['filters['+this.filterKeys[i]+']']
                              || this.defaultQueryParams['filters['+this.filterKeys[i]+']'];
    }
  }

  initSort(){
    if( !this.sortKeys ) return ;
    let currentQueryParams = this.getQueryParams()
    ;
    for (var i = 0; i < this.sortKeys.length; i++) {
      this[this.sortKeys[i]] = currentQueryParams['sortings['+this.sortKeys[i]+']']
                                   || this.defaultQueryParams['sortings['+this.sortKeys[i]+']'];
    }
  }

  initSearch() {
    let currentQueryParams = this.getQueryParams()
    ;
    this.q = currentQueryParams['search[q]'] || this.defaultQueryParams['search[q]'];
  }

  initPagination(){
    let currentQueryParams = this.getQueryParams()
    ;
    this.page_number = currentQueryParams['page_number'] || this.defaultQueryParams['page_number'];
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
    let searchValue = {
      'page_number': 1
    };
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
    let currentQueryParams = this.getQueryParams(),
        newQueryParams ={}
    ;
    if(Object.keys(currentQueryParams).length === 0 && currentQueryParams.constructor === Object){
       newQueryParams = Object.assign(this.defaultQueryParams, params);
    } else {
       newQueryParams = Object.assign(currentQueryParams, params);
    }
    this.router.navigate([], { queryParams: newQueryParams });
  }

}
