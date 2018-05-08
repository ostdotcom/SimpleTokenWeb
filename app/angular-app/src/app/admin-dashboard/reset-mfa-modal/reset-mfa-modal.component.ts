import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OstHttp } from '../../ost-http.service';
import { RequestStateHandlerService } from '../../request-state-handler.service';
declare var $: any; 

@Component({
  selector: 'reset-mfa-modal',
  templateUrl: './reset-mfa-modal.component.html',
  styleUrls: ['./reset-mfa-modal.component.scss']
})
export class ResetMfaModalComponent implements OnInit {

  constructor( private http: OstHttp ,  private stateHandler : RequestStateHandlerService) { }

  @Input('user') user; 
  @Input('resetMfaApi') resetMfaApi; 
  @Output('resetMfaSuccessEvent') resetMfaSuccessEvent =  new EventEmitter(); 

  isResetMfa: boolean =  false; 

  ngOnInit() {
    $("#resetMfaModal").off("hidden.bs.modal").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isResetMfa =  false; 
    });
  }

  resetMfa() { 
    let params = {
      'id' : this.user['id']
    }
    this.stateHandler.updateRequestStatus(this ,  true ); 
    this.http.post( this.resetMfaApi , {...params} ).subscribe(
      response => {
        this.onResetMfaSuccess( response.json() );  
      },
      error => {
        this.onResetMfaFailure( error.json() ); 
      }
    )
  }

  onResetMfaSuccess( response ){
    this.isResetMfa = true ; 
    this.stateHandler.updateRequestStatus(this); 
    this.resetMfaSuccessEvent.emit( this.user ); 
  }

  onResetMfaFailure( error ){
    this.stateHandler.updateRequestStatus(this , false , true,  false  , error ); 
  }

}
