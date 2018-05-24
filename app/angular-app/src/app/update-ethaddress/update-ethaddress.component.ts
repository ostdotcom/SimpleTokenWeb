import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { ScrollTopService } from '../services/scroll-top.service';


@Component({
  selector: 'update-ethaddress',
  templateUrl: './update-ethaddress.component.html',
  styleUrls: ['./update-ethaddress.component.scss']
})
export class UpdateEthaddressComponent implements OnInit {

  @Input() caseId;
  errorMsg = '';
  postUrl = 'api/admin/kyc/update-address';
  ethAddress;
  data = {};
  updateMsg = 'Update eth address';
  buttonDisabled = null;
  ethAddrUpdated = false;
  ethAddrInputDisabled = null;


  constructor(private http: OstHttp,  private scrollTopService : ScrollTopService) { }

  @Output("closeEthAddressEvent") closeEthAddressEvent =  new EventEmitter();
  @Output('actionSuccessEvent') actionSuccessEvent =  new EventEmitter();

  ngOnInit() {
    this.scrollTopService.scrollTop();
  }

  updateEthAddress(updateEthAdressForm) {
    let ethAddress = this.data['ethereum_address'] = updateEthAdressForm.value.address.trim();
    this.data['id'] = this.caseId;
    if (!ethAddress) {
      this.errorMsg = 'Please enter Eth address';
      return;
    }
    this.buttonDisabled = true;
    this.updateMsg = 'updating ...';
    this.http.post(this.postUrl, this.data).subscribe(
      response => {
        let res = response.json();
        this.buttonDisabled = null;
        this.updateMsg = 'update eth address';
        if (res.success) {
          this.ethAddrUpdated = true;
          this.ethAddrInputDisabled = true;
          setTimeout(function(){
            this.closeEthAddressEvent.emit("closeEthAddressEvent");
            this.actionSuccessEvent.emit();
          }.bind(this), 1000);
        } else {
          this.errorMsg = res.err.display_text;
        }

      },
      error => {
        this.buttonDisabled = null;
        let err = error.json();
      });
  }

  hideEthAddress() {
    this.closeEthAddressEvent.emit("closeEthAddress");
  }
  onKey(e){
    this.errorMsg = '';
  }

}
