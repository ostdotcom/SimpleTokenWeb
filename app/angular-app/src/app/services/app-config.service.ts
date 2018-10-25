import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
    data:object = {};

    setAppInitData( data:object ){
        this.data = data;
    }

    getAppInitData( data ):object {
       return this.data ;
    }

    getLoggedInUserName() {
        let admin = this.data && this.data['admin'];
        return admin && admin['email'] || "";
    }

    isSuperAdmin():boolean{
        let admin = this.data && this.data['admin'],
            role =  admin && admin['role'],
            isSuperAdmin =false ;
        if( role == "super_admin"){
            isSuperAdmin =  true;
        }
        return isSuperAdmin;
    }

    hasWhiteListSetUp():boolean{
       return this.data['client_setup'] && this.data['client_setup']['has_whitelist_setup'];
    }

    hasEmailSetup():boolean{
        return this.data['client_setup'] && this.data['client_setup']['has_email_setup'];
    }

    getClientSetup() {
        let client = this.data && this.data['client_setup'];
        return client || "";
    }

    hasEthereumAddressField():boolean{
      return this.data['kyc_config_detail'] && this.data['kyc_config_detail']['has_ethereum_address_field'];
    }

    getEnvironment(){
      return this.data['environment'];
    }

    hasClientOpted():boolean{
      return this.data['client_setup'] && this.data['client_setup']['web_host_setup_done'];
    }

    hasWhitelistAddOn() {
      let client_plan = this.data['client_plan'] && this.data['client_plan']['add_ons'];
      if ( client_plan ) {
        return (client_plan.indexOf('whitelist') !== -1);
      }
      return false;
    }

    getSuspensionType() {
      let suspension_type = this.data['client_whitelist'] &&  this.data['client_whitelist']['suspension_type'];
      return suspension_type;
    }

    hasLowEthBalance() {
      return this.data['client_whitelist'] && this.data['client_whitelist']['low_eth_balance'];
    }

}
