import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'manage-user-row',
  templateUrl: './manage-user-row.component.html',
  styleUrls: ['../../table/ost-row/ost-row.component.scss',  './manage-user-row.component.scss']
})
export class ManageUserRowComponent implements OnInit {

  @Output("deleteRowEvent") deleteRowEvent = new EventEmitter();
  @Input() row;
  constructor() { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  deleteUser(){
    this.deleteRowEvent.emit(this.row);
  }

}
