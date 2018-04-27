import { Component, OnInit, Input, Pipe } from '@angular/core';
import { RowBaseComponent } from '../table/row-base.component';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})

export class RowComponent extends RowBaseComponent implements OnInit {

    @Input() row;

    ngOnInit() {
      this.cacheInitialValue( this.row );
    }

    save( ){
      this.updateRow( this.row );
    }
}
