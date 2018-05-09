import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OstHttp } from '../../ost-http.service';
import { RequestStateHandlerService } from '../../request-state-handler.service';

declare var $:any; 

@Component({
  selector: 'qualify-action-modal',
  templateUrl: './qualify-action-modal.component.html',
  styleUrls: ['./qualify-action-modal.component.scss']
})
export class QualifyActionModalComponent implements OnInit {

constructor( private http: OstHttp , private stateHandler : RequestStateHandlerService) { }

@Input('postApi') postApi ; 
@Input('caseId') caseId; 
@Output('qaulifyActionSuccessEvent') qaulifyActionSuccessEvent = new EventEmitter(); 

ngOnInit() {

  $("#qualifyActionModal").off('hidden.bs.modal').on("hidden.bs.modal", () => {
    this.stateHandler.updateRequestStatus(this);
  });
}

onQualify(){
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
  this.qaulifyActionSuccessEvent.emit(true); 
  $('#qualifyActionModal').modal('hide');
}

onError( error ){
  this.stateHandler.updateRequestStatus(this, false , true ,  false , error); 
}

}
