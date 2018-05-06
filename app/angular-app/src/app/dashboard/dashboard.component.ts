import { Component, OnInit } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private entityConfigService : EntityConfigService ) {}

  //Default parameters
  adminStatus : any ;
  admimReviewStatus : any;
  cynopsisStatus: any;
  whiteListStatus: any;
  sortBy : any;
  pageNumber: number;

  ngOnInit() {
    this.initFilters();
    this.initSort();
    this.initPagination();
  }

  initFilters(){
    this.adminStatus = "all";
    this.admimReviewStatus = "all";
    this.cynopsisStatus = "all";
    this.whiteListStatus = "all";
  }

  initSort(){
    this.sortBy = "desc";
  }

  initPagination(){
    this.pageNumber = 1 ;
  }

  onFilterChange(  ) {

  }

  onSortChange(  ){

  }

  onPageChange ( ){

  }

}
