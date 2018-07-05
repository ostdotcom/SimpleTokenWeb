import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'admin-setting-menus',
  templateUrl: './admin-setting-menus.component.html',
  styleUrls: ['./admin-setting-menus.component.scss']
})
export class AdminSettingMenusComponent implements OnInit {

  show:boolean;
  isSuperAdmin: boolean = false;

  constructor(public router: Router, private appConfigService: AppConfigService ) { }

  ngOnInit() {
    this.show=true;
    this.isSuperAdmin = this.appConfigService.isSuperAdmin();
  }

  toggleShow(){
      this.show = !this.show;
  }
}
