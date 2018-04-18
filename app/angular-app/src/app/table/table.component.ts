import { Component, OnInit } from '@angular/core';
import { TabledataService } from '../tabledata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

   rows = []; header = [];

   constructor(private tabledataService: TabledataService) { }

   ngOnInit() {
       this.getHeader();
       this.getRows();
   }

   getHeader() {
     this.tabledataService.getHeader().then( header => this.header = header);

   }

   getRows(): void {
     this.tabledataService.getRows().then(rows => this.rows = rows );
   }

}
