import {Component, OnInit} from '@angular/core';
import {AppConfigService} from "../services/app-config.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {OstHttp} from "../services/ost-http.service";

declare var $: any;

@Component({
  selector: 'app-contract-addresses',
  templateUrl: './contract-addresses.component.html',
  styleUrls: ['./contract-addresses.component.scss']
})
export class ContractAddressesComponent implements OnInit {

  errorMessage : string  = null;
  isProcessing : boolean = true;
  hasError     : boolean = false;
  errorResponse: boolean = false;

  ethereum_deposit_address  : string  = null;
  whitelist_contract_address: string  = null;
  verified_operator_address : string  = null;
  web_host_setup_done       : boolean = false;
  has_whitelist_add_on      : boolean = false;
  rewhitelist_users         : boolean = false;
  otp                       : string  = null;

  dataUrl: string  = 'api/admin/setting/contract-addresses';
  context: object  = {};

  constructor(public appConfig: AppConfigService,
              private http: OstHttp,
              private stateHandler: RequestStateHandlerService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.web_host_setup_done  = this.appConfig.hasClientOpted();
    this.has_whitelist_add_on = this.appConfig.hasWhitelistAddOn();

    if(!this.web_host_setup_done && !this.has_whitelist_add_on) {
      window.location.href = '/admin/dashboard';
    } else {
      this.http.get(this.dataUrl).subscribe(
        response => {
          let res = response.json();
          if (res.success) {
            this.ethereum_deposit_address   = res.data.ethereum_deposit_address;
            this.whitelist_contract_address = res.data.whitelist_contract_address;
            this.verified_operator_address  = res.data.verified_operator_address;
            this.stateHandler.updateRequestStatus(this, false, false);
          } else {
            this.stateHandler.updateRequestStatus(this, false, true, false, res);
          }
        },
        error => {
          let err = error.json();
          this.stateHandler.updateRequestStatus(this, false, true, false, err);
        })
    }

  }

  submitDepositAddress( depositAddressForm ) {
    $('#verifyOTPPopup').modal('show');
    this.context = {
      'form' : depositAddressForm,
      'url'  : 'api/admin/setting/update-deposit-address'
    }
  }

  submitWhitelistingAddress( whitelistAddressForm ) {
    $('#verifyOTPPopup').modal('show');
    this.context = {
      'form': whitelistAddressForm,
      'url' : 'api/admin/setting/update-whitelist-address'
    }
  }

  handleError( response ) {
    if( response.success ) {
      this.errorResponse = null;
    }
    this.errorResponse = response;
  }

}
