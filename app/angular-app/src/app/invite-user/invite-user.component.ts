import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  constructor() { }

  @Output('closeInviteUser') closeInviteUser = new EventEmitter<boolean>();
  
  ngOnInit() {
  }

  hideInviteUser(){
    this.closeInviteUser.emit( true );
  }

}
