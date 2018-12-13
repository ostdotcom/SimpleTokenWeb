import {Component, Input, OnInit} from '@angular/core';

declare var $:any;

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input()
  public callBack: Function;

  @Input('isSuccess') isSuccess       : boolean;
  @Input('isProcessing') isProcessing : boolean;
  @Input('hasError') hasError         : boolean;
  @Input('modalId') modalId           : string  = this.modalId || "confirmation-modal" ;
  @Input('errorResponse') errorResponse;

  btnText      : string = "YES, CONTINUE";
  errorMessage : string = null;

  constructor() { }

  ngOnInit() {

  }

  hasErrorMessage() {
    if( this.errorResponse ){
      let err = this.errorResponse['err'];
      this.errorMessage = err && err['display_text'] ;
      return true;
    }
    return false;
  }

}
