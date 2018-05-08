import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OstHttp } from '../../ost-http.service';
import { RequestStateHandlerService } from '../../request-state-handler.service';
declare var $: any; 

@Component({
  selector: 'delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  constructor( private http: OstHttp ,  private stateHandler : RequestStateHandlerService) { }

  @Input('user') user; 
  @Input('deleteUserApi') deleteUserApi; 
  @Output('deleteUserSuccessEvent') deleteUserSuccessEvent =  new EventEmitter(); 

  isUserDeleted: boolean =  false; 

  ngOnInit() {
    $("#deleteAdminUserModal").off("hidden.bs.modal").on("hidden.bs.modal", () => {
      this.stateHandler.updateRequestStatus(this);
      this.isUserDeleted = false; 
    });
  }

  deleteUser() { 
    let params = {
      'id' : this.user['id']
    }
    this.stateHandler.updateRequestStatus(this ,  true ); 
    this.http.post( this.deleteUserApi , {...params} ).subscribe(
      response => {
        this.onDeleteUserSuccess( response.json() ); 
      },
      error => {
        this.onDeleteUserFailure( error.json() ); 
      }
    )
  }

  onDeleteUserSuccess( response ){
    this.isUserDeleted =  true; 
    this.stateHandler.updateRequestStatus(this); 
    this.deleteUserSuccessEvent.emit( this.user ); 
  }

  onDeleteUserFailure( error ) {
    this.stateHandler.updateRequestStatus(this , false , true,  false  , error ); 
  }

}
