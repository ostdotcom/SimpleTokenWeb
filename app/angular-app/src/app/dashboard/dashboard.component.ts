import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RowComponent } from '../kyc_user_row/row.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tableType = 'dashboard';

  config = {
    tableDataUrl : 'api/admin/kyc/dashboard/',
    header: ['Name / Date', 'Admin status', 'Cynopsis', 'Whitelist', 'Residence country',
             'Natinality', 'Submission', 'duplicate status', 'Admin']
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('config' ,  this.config );
   }

}
