import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OstHttp } from '../../services/ost-http.service';
import { RequestStateHandlerService } from '../../services/request-state-handler.service';

declare var $:any;

@Component({
  selector: 'kyc-case-action-modal',
  templateUrl: './kyc-case-action-modal.component.html',
  styleUrls: ['./kyc-case-action-modal.component.scss']
})

export class KycCaseActionModalComponent  {

  constructor( private http: OstHttp , private stateHandler : RequestStateHandlerService) { }

  errorMessage;
  hasError: boolean = false;
  isProcessing: boolean = false;


  @Input('postApi') postApi ;
  @Input('params') params;
  @Input('modalId') modalId ;

  //Inputs with defaults
  @Input('actionBtnPrimaryName') actionBtnPrimaryName?:string = "OK";
  @Input('actionBtnSecondaryName') actionBtnSecondaryName?:string = "CANCEL";
  @Input('actionBtnPrimaryClass') actionBtnPrimaryClass?:string = "btn-primary";

  //Output
  @Output('actionSuccessEvent') actionSuccessEvent : EventEmitter<any> =  new EventEmitter();

  ngAfterViewInit() {
    $("#"+this.modalId).off('hidden.bs.modal').on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
    });
  }

  onAction(){
    let params = this.params;
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
    $("#"+this.modalId).modal('hide');
    this.actionSuccessEvent.emit(response);
  }

  onError( error ){
    this.stateHandler.updateRequestStatus(this, false , true ,  false , error);
  }

}
