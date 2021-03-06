
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { OstHttp } from '../../services/ost-http.service';
import { RequestStateHandlerService } from '../../services/request-state-handler.service';
declare var $: any;

@Component({
  selector: 'manage-user-modal',
  templateUrl: './manage-user-modal.component.html',
  styleUrls: ['./manage-user-modal.component.scss']
})
export class ManageUserModalComponent {


  constructor( private http: OstHttp ,  private stateHandler : RequestStateHandlerService) { }

  errorMessage;
  hasError: boolean = false;
  isProcessing: boolean = false;
  @Input('actionButtonClass') actionButtonClass;
  @Input('DataType') DataType;
  @Input('modalId') modalId ;
  @Input('user') user;
  @Input('postApi') postApi;
  @Input('actionBtnPrimaryName') actionBtnPrimaryName ;

  @Output('actionSuccessEvent') actionSuccessEvent =  new EventEmitter();

  isSuccess: boolean =  false;

  ngAfterViewInit() {
    $("#"+this.modalId).off("hidden.bs.modal").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isSuccess = false;
    });
  }

  onAction() {
    let params = {
      'id' : this.user[this.DataType]
    }
    this.stateHandler.updateRequestStatus(this ,  true );
    this.http.post( this.postApi , {...params} ).subscribe(
      response => {
        let res = response.json();
        if (res.success)
          this.onSuccess( res );
        else{
          this.onFailure( res );
        }
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
