import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestStateHandlerService } from '../../request-state-handler.service';
import { OstHttp } from '../../ost-http.service';
declare var $:any;

@Component({
  selector: 'invite-user-modal',
  templateUrl: './invite-user-modal.component.html',
  styleUrls: ['./invite-user-modal.component.scss']
})
export class InviteUserModalComponent implements OnInit {

  constructor(public stateHandler: RequestStateHandlerService ,  private http : OstHttp) { }

  @Input('inviteUserForm') inviteUserForm ; 
  @Output('onInviteSuccessEvent') onInviteSuccessEvent = new EventEmitter(); 

  ngOnInit() {
    $("#inviteUser").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
    });
  }

  sendInvite() {
    let params = this.inviteUserForm.value;
    this.stateHandler.updateRequestStatus(this,  true);
    this.http.post('api/admin/admin-user/invite/' , {...params }  ).subscribe(
      response => {
        let res = response.json();
        if( res.success ){
          this.stateHandler.updateRequestStatus(this);
          $('#inviteUser').modal('hide');
          setTimeout(()=> {
            this.onInviteSuccessEvent.emit( true ); 
          } , 500 )
        }else{
          this.stateHandler.updateRequestStatus(this,  false,  true , false, res);
        }
      },
      error => {
        this.stateHandler.updateRequestStatus(this,  false,  true , false, error.json());
      }
    )
  }

}
