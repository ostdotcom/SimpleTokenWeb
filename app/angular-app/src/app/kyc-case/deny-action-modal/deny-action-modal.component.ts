import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OstHttp } from '../../ost-http.service';
import { RequestStateHandlerService } from '../../request-state-handler.service';

declare var $:any; 

@Component({
  selector: 'deny-action-modal',
  templateUrl: './deny-action-modal.component.html',
  styleUrls: ['./deny-action-modal.component.scss']
})
export class DenyActionModalComponent implements OnInit {

  constructor( private http: OstHttp , private stateHandler : RequestStateHandlerService) { }

  @Input('postApi') postApi ; 
  @Input('caseId') caseId; 
  @Output('denyActionSuccessEvent') denyActionSuccessEvent = new EventEmitter(); 

  ngOnInit() {
    $("#denyActionModal").off('hidden.bs.modal').on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
    });
  }

  onDeny(){
    let params = { 'id' : this.caseId };
    this.stateHandler.updateRequestStatus(this, true); 
    this.http.post( this.postApi , {...params}).subscribe(
      response => {
          this.onSuccess( response.json() )
      },
      error => {
        this.onError( error.json() ); 
      }
    )

  }

  onSuccess( response ){
    if( !response.success ) {
      this.stateHandler.updateRequestStatus(this, false , true ,  false , response); 
      return ; 
    }
    this.stateHandler.updateRequestStatus(this, false); 
    this.denyActionSuccessEvent.emit(true); 
    $('#denyActionModal').modal('hide');
  }

  onError( error ){
    this.stateHandler.updateRequestStatus(this, false , true ,  false , error); 
  }

}
