import {Component, Input, OnInit} from '@angular/core';
import {OstHttp} from "../../services/ost-http.service";

declare var $:any;

@Component({
  selector: 'update-eth-modal',
  templateUrl: './update-eth-modal.component.html',
  styleUrls: ['./update-eth-modal.component.scss']
})
export class UpdateEthModalComponent implements OnInit {

  @Input('user') user;

  errorResponse: Object = {};
  postUrl : string = 'api/admin/kyc/update-address';
  updateBtnText : string = 'Update';
  isUpdating : boolean = false;
  isSuccess  : boolean = false ;

  constructor(private http: OstHttp) { }

  ngOnInit() {
    $("#updateEthAddressModal").on("hidden.bs.modal", () => {
      $('#updateEthAdressForm').trigger('reset');
      this.isUpdating = false ;
      this.isSuccess = false ;
      this.updateBtnText = 'Update';
      this.errorResponse = {};
    });
  }

  updateEthAddress( updateEthAdressForm ) {
    let data = updateEthAdressForm.value,
        caseId = this.user && this.user['case_id']
        ;
    data['id'] = caseId;
    this.isUpdating = true;
    this.updateBtnText = 'Updating ...';
    this.http.post(this.postUrl, data).subscribe(
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
    this.isSuccess = true ;
  }

  onError( res ){
    this.errorResponse = res ;
    this.onComplete();
  }

  onComplete(){
    this.isUpdating = false;
    this.updateBtnText = 'update';
  }

  resetForm( form ){
    form.reset();
    $("#updateEthAddressModal").modal('hide');
  }

}
