import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'kyc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  web_host_setup_done  :boolean  = false;
  has_whitelist_add_on :boolean  = false;
  isSuperAdmin         :boolean  = false;

  constructor(
    public appConfig : AppConfigService
  ) { }

  ngOnInit() {
    this.web_host_setup_done  = this.appConfig.hasClientOpted();
    this.has_whitelist_add_on = this.appConfig.hasWhitelistAddOn();
    this.isSuperAdmin         = this.appConfig.isSuperAdmin();
  }

  getSettingsRoute() {
    if( this.isSuperAdmin && (this.web_host_setup_done || this.has_whitelist_add_on) ) {
      return '/admin/settings/contract-addresses';
    }
    return '/admin/settings/sale-settings';
  }

}
