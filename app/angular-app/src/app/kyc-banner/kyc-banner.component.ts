import { Component, OnInit } from '@angular/core';
import {AppConfigService} from "../services/app-config.service";

@Component({
  selector: 'kyc-banner',
  templateUrl: './kyc-banner.component.html',
  styleUrls: ['./kyc-banner.component.scss']
})
export class KycBannerComponent implements OnInit {

  whitelistingStopped : boolean = false;
  hasLowEthBalance    : boolean = false;
  suspensionType      : string  = '';

  constructor( public appConfig: AppConfigService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.suspensionType  = this.appConfig.getSuspensionType();
    this.hasLowEthBalance = this.appConfig.hasLowEthBalance();
    if( this.suspensionType == "low_balance" ) {
      this.whitelistingStopped = true;
    }
  }

}
