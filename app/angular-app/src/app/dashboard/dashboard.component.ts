import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  status = 'approved';
  name = 'all';

  // statusFilter = {};
  // nameFilter = {};



  statusFilter = {id: 'status-filter', selected: this.status, list: [{value: 'approved', text: 'Approved'},
    {value: 'not-approved', text: 'Not approved'}]};
nameFilter = {id: 'name-filter', selected: this.name, list: [{value: 'all', text: 'All'},
{value: 'a', text: 'A is initial'},
{value: 'b', text: 'B is initial'},
{value: 'c', text: 'C is initial'}]};



  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('Here');

    this.router.navigate(['/admin/new-dashboard'], { queryParams: { name: this.name, status: this.status } });


    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams) {
        this.status = queryParams.status;
        this.name = queryParams.name;
      }
   });

    this.statusFilter.selected = this.status;
    this.nameFilter.selected = this.name;


  }

  handleFilterChange(param): void {
    if (param.id === 'status-filter') {
      this.status = param.selectedValue;
    } else if (param.id === 'name-filter') {
      this.name = param.selectedValue;
    }

    this.router.navigate(['/admin/new-dashboard'], { queryParams: { name: this.name, status: this.status } });
  }

}
