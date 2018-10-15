import { Component, OnInit } from '@angular/core';
import {AppConfigService} from "../services/app-config.service";

@Component({
  selector: 'kyc-banner',
  templateUrl: './kyc-banner.component.html',
  styleUrls: ['./kyc-banner.component.scss']
})
export class KycBannerComponent implements OnInit {

  showBanner      : boolean = false;
  hasLowEthBalance: boolean = false;
  suspension_type : string  = '';

  constructor( public appConfig: AppConfigService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.suspension_type  = this.appConfig.getSuspensionType();
    this.hasLowEthBalance = this.appConfig.hasLowEthBalance();
    if( this.suspension_type !== "no" ) {
      this.showBanner = true;
    }
  }

}
