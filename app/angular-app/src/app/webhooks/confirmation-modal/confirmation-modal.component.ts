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

  @Input('success') isSuccess: boolean;

  @Input('errorResponse') errorResponse;

  btnText: string = "YES, CONTINUE";

  constructor() { }

  ngOnInit() {

  }

}
