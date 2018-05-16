import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  constructor(private scrollTopService: ScrollTopService) { }

  email: any;
  name: any;

  @Output('closeInviteUser') closeInviteUser = new EventEmitter<boolean>();
  
  ngOnInit() {
    this.scrollTopService.scrollTop();
  }

  hideInviteUser(){
    this.closeInviteUser.emit( true );
  }

}
