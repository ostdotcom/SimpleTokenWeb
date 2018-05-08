import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OstHttp } from '../../ost-http.service';
import { RequestStateHandlerService } from '../../request-state-handler.service';
declare var $: any; 

@Component({
  selector: 'resend-invite-modal',
  templateUrl: './resend-invite-modal.component.html',
  styleUrls: ['./resend-invite-modal.component.scss']
})
export class ResendInviteModalComponent implements OnInit {

  constructor( private http: OstHttp ,  private stateHandler : RequestStateHandlerService) { }

  @Input('user') user; 
  @Input('resendInviteApi') resendInviteApi; 
  @Output('resendInviteSuccessEvent') resendInviteSuccessEvent =  new EventEmitter(); 

  isInviteSend: boolean =  false; 

  ngOnInit() {
    $("#resendInviteModal").off("hidden.bs.modal").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isInviteSend =  false; 
    });
  }

  sendInvite() { 
    let params = {
      'id' : this.user['id']
    }
    this.stateHandler.updateRequestStatus(this ,  true ); 
    this.http.post( this.resendInviteApi , {...params} ).subscribe(
      response => {
        this.onSendInviteSuccess( response.json() );  
      },
      error => {
        this.onSendInviteFailure( error.json() ); 
      }
    )
  }

  onSendInviteSuccess( response ){
    this.isInviteSend = true ; 
    this.stateHandler.updateRequestStatus(this); 
    this.resendInviteSuccessEvent.emit( this.user ); 
  }

  onSendInviteFailure( error ){
    this.stateHandler.updateRequestStatus(this , false , true,  false  , error ); 
  }

}