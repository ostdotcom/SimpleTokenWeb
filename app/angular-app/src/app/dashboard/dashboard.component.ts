import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  config = {
    tableDataUrl : "api/admin/kyc/dashboard/"
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    console.log("config" ,  this.config );
   };

}
