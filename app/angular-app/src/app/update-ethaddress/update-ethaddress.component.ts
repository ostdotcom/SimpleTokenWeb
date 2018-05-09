import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {OstHttp} from '../ost-http.service';


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


  constructor(private http: OstHttp) { }

  @Output("closeEthAddressEvent") closeEthAddressEvent =  new EventEmitter();

  ngOnInit() {
  }

  updateEthAddress(updateEthAdressForm) {
    let ethAddress = this.data['ethereum_address'] = updateEthAdressForm.value.address.trim();
    this.data['case_id'] = this.caseId;
    if (!ethAddress) {
      this.errorMsg = 'Please fill Eth address';
      return;
    }
    this.updateMsg = 'updating ...';
    this.http.post(this.postUrl, this.data).subscribe(
      response => {
        let res = response.json();
        this.updateMsg = 'update eth address';
        if (res.success){
          this.closeEthAddressEvent.emit("closeEthAddressEvent");
        } else{
          this.errorMsg = res.err.display_text;
        }


       // this.stateHandler.updateRequestStatus(this);
       // this.isMailSent = true;
      },
      error => {
        this.errorMsg = 'abcd';
        let err = error.json();
        // this.stateHandler.updateRequestStatus(this , false , true,  false  , err );

      });
  }

  hideEthAddress() {
    this.closeEthAddressEvent.emit("closeEthAddress");
  }

}
