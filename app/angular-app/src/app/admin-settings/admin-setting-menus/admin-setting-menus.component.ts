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

  show                :boolean;
  isSuperAdmin        : boolean = false;
  web_host_setup_done :boolean  = false;
  has_whitelist_add_on:boolean  = false;

  constructor(public router: Router, private appConfigService: AppConfigService ) { }

  ngOnInit() {
    this.show=true;
    this.isSuperAdmin = this.appConfigService.isSuperAdmin();
    this.web_host_setup_done  = this.appConfigService.hasClientOpted();
    this.has_whitelist_add_on = this.appConfigService.hasWhitelistAddOn();
  }

  toggleShow(){
      this.show = !this.show;
  }
}
