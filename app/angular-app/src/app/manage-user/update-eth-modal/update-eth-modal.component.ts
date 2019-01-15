import {Component, Input, OnInit} from '@angular/core';
import {OstHttp} from "../../services/ost-http.service";

declare var $:any;

@Component({
  selector: 'update-eth-modal',
  templateUrl: './update-eth-modal.component.html',
  styleUrls: ['./update-eth-modal.component.scss']
})
export class UpdateEthModalComponent implements OnInit {

  @Input() user;
  @Input() modalId;

  errorMsg = '';
  postUrl = 'api/admin/kyc/update-address';
  data = {};
  updateMsg = 'Update';
  isUpdating = false;
  ethAddrUpdated = false;
  ethAddrInputDisabled = false;

  constructor(private http: OstHttp) { }

  ngOnInit() {
    $("#"+this.modalId).off('hidden.bs.modal').on("hidden.bs.modal", () => {
      this.errorMsg='';
    });
  }

  updateEthAddress(updateEthAdressForm) {
    let ethAddress = this.data['ethereum_address'] = updateEthAdressForm.value.address.trim(),
        caseId = this.user && this.user['case_id'];
    this.data['id'] = caseId;
    if (!ethAddress) {
      this.errorMsg = 'Please enter eth address';
      return;
    }
    this.isUpdating = true;
    this.updateMsg = 'Updating ...';
    this.http.post(this.postUrl, this.data).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.onSuccess( res );
        } else {
          this.onError( res );
        }
      },
      error => {
        let err = error.json();
        this.onError( err );
      });
  }

  onSuccess( res ) {
    this.onComplete();
    this.ethAddrUpdated = true;
    this.ethAddrInputDisabled = true;
  }

  onError( res ){
    this.onComplete();
    this.errorMsg = res && res.err && res.err.display_text;
  }

  onComplete(){
    this.isUpdating = false;
    this.updateMsg = 'update';
  }

  onKey(e){
    this.errorMsg = '';
  }

}
