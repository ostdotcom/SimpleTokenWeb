import { Component, OnInit, Output } from '@angular/core';
import { OstHttp } from '../ost-http.service';
import { EventEmitter } from '@angular/core';
import { RequestStateHandlerComponent } from '../request-state-handler/request-state-handler.component';
import { RequestStateHandlerService } from '../request-state-handler.service';
declare var $:any;

@Component({
  selector: 'invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  constructor(private http: OstHttp , private stateHandle : RequestStateHandlerService) { }

  @Output('closeInviteUser') closeInviteUser = new EventEmitter<boolean>();
  
  ngOnInit() {
    $("#inviteUser").on("hidden.bs.modal", function () {
      this.stateHandle.updateRequestStatus(this,  false,  false , false, );
    });
  }

  sendInvite( inviteUserForm ) {
    let params = inviteUserForm.value;
    this.stateHandle.updateRequestStatus(this,  true,  false);
    this.http.post('api/admin/admin-user/invite/' , {...params }  ).subscribe(
      response => {
        let res = response.json();
        if( res.success ){
          this.stateHandle.updateRequestStatus(this,  false,  false);
          $('#inviteUser').modal('hide');
        }else{
          this.stateHandle.updateRequestStatus(this,  false,  true , false, res);
        }
      },
      error => {
        this.stateHandle.updateRequestStatus(this,  false,  true , false, error.json());
      }
    )
  }

  hideInviteUser(){
    this.closeInviteUser.emit( true );
  }

}
