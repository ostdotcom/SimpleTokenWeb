import { Component, OnInit, Output } from '@angular/core';
import { OstHttp } from '../ost-http.service';
import { EventEmitter } from '@angular/core';
declare var $:any;

@Component({
  selector: 'invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  constructor(private http: OstHttp) { }
  errMsg:boolean;

  @Output('closeInviteUser') closeInviteUser = new EventEmitter<boolean>();


  ngOnInit() {
  }

  sendInvite( inviteUserForm ){
    let params = inviteUserForm.value;
    this.http.post('api/admin/admin-user/invite' , {...params }  ).subscribe(
      response => {
        let res = response.json();
        $('#inviteUser').modal('hide');
      },
      error => {
        let err = error.json();
        if(err && err['err']){
          this.errMsg = err['err']['display_text'];
        }
      }
    )
  }

  hideInviteUser(){
    this.closeInviteUser.emit( true );
  }

}
