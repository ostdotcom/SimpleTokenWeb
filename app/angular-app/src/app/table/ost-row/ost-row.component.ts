import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OstHttp } from '../../services/ost-http.service';

@Component({
  selector: 'ost-row',
  templateUrl: './ost-row.component.html',
  styleUrls: ['./ost-row.component.scss']
})
export class OstRowComponent {

  @Output('deleteRowEvent') deleteRowEvent = new EventEmitter();
  @Output('updateRowEvent') updateRowEvent = new EventEmitter();

  constructor(private http?: OstHttp){
  }

  cachedRow:Object ;

  cacheInitialValue( row ){
      this.cachedRow = Object.create( row );
  }

  onDelete( row ){
    this.deleteRowEvent.emit(row);
  };

  onUpdate( row ){
    this.updateRowEvent.emit(row);
  }

}
