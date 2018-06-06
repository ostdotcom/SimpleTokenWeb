import { Component, Output, EventEmitter, Input } from '@angular/core';
import { OstHttp } from '../../services/ost-http.service';
import { RequestStateHandlerService } from '../../services/request-state-handler.service';
declare var $: any;

@Component({
  selector: 'admin-dashboard-modal',
  templateUrl: './admin-dashboard-modal.component.html',
  styleUrls: ['./admin-dashboard-modal.component.scss']
})
export class AdminDashboardModalComponent  {

  constructor( private http: OstHttp ,  private stateHandler : RequestStateHandlerService) { }

  errorMessage;
  hasError: boolean = false;
  isProcessing: boolean = false;

  @Input('modalId') modalId ;
  @Input('user') user;
  @Input('postApi') postApi;
  @Input('actionBtnPrimaryName') actionBtnPrimaryName ;

  @Output('actionSuccessEvent') actionSuccessEvent =  new EventEmitter();

  isSuccess: boolean =  false;

  ngAfterViewInit() {
    $("#"+this.modalId).on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isSuccess = false;
    });
  }

  onAction() {
    let params = {
      'id' : this.user['id']
    }
    this.stateHandler.updateRequestStatus(this ,  true );
    this.http.post( this.postApi , {...params} ).subscribe(
      response => {
        this.onSuccess( response.json() );
      },
      error => {
        this.onFailure( error.json() );
      }
    )
  }

  onSuccess( response ){
    this.isSuccess =  true;
    this.stateHandler.updateRequestStatus(this);
    this.actionSuccessEvent.emit( this.user );
  }

  onFailure( error ) {
    this.stateHandler.updateRequestStatus(this , false , true,  false  , error );
  }

}
