import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OstHttp } from '../../services/ost-http.service';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'ost-row',
  templateUrl: './ost-row.component.html',
  styleUrls: ['./ost-row.component.scss']
})
export class OstRowComponent {

  @Output('deleteRowEvent') deleteRowEvent = new EventEmitter();
  @Output('updateRowEvent') updateRowEvent = new EventEmitter();

  isSuperAdmin:boolean = false;

  constructor(private http?: OstHttp, public appConfigService?: AppConfigService){

    if( appConfigService ) {
      this.isSuperAdmin = this.appConfigService.isSuperAdmin();
    }

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
