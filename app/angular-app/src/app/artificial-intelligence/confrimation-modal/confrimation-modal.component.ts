import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { OstHttp } from '../../services/ost-http.service';
import { RequestStateHandlerService } from '../../services/request-state-handler.service';

declare var $ : any; 

@Component({
  selector: 'ai-confrimation-modal',
  templateUrl: './confrimation-modal.component.html',
  styleUrls: ['./confrimation-modal.component.scss']
})
export class ConfrimationModalComponent {

  @Input('params') params ; 
  @Output('onSuccessEvent') onSuccessEvent = new EventEmitter();
  @Output('onErrorEvent')   onErrorEvent = new EventEmitter();

  constructor( private http : OstHttp ,  private stateHandler : RequestStateHandlerService ) { }

  ngAfterViewInit() {
    $("#ai-confimation-modal").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isSuccess = false;
    });
  }

  isProcessing  : boolean = false; 
  hasError      : boolean = false; 
  isSuccess     : boolean = false;
  errorMessage  : object  = null;
  
  onConfirmation() {
    let params = this.params; 
    this.stateHandler.updateRequestStatus(this, true ); 

    this.http.post('api/admin/client/update-auto-approve-setting' , {...params}).subscribe(
      response =>{
        let res = response.json()
        if( res.success ){
          this.stateHandler.updateRequestStatus(this, false , false); 
          this.isSuccess = true; 
          this.onSuccessEvent.emit( res ); 
        }else{
          this.stateHandler.updateRequestStatus(this, false , true , false , res ); 
          this.onErrorEvent.emit( res ); 
        }
      },
      error => {
        let err =  error.json(); 
        this.stateHandler.updateRequestStatus(this, false , true , false , err ); 
        this.onErrorEvent.emit( err ); 
      }
    )
  }


}
