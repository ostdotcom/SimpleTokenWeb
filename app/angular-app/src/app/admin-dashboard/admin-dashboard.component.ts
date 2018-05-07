import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  showInviteUser: boolean = false;

  ngOnInit() {
  }

  hideInviteUserSection(){
    this.showInviteUser = false;
  }

  showInviteUserSection(){
    this.showInviteUser = true;
  }
}
