import { Component, OnInit } from '@angular/core';
import { TabledataService } from '../tabledata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

   rows = []; header = [];

  loading = false;
  total = 0;
  page = 1;
  limit = 20;

   constructor(private tabledataService: TabledataService) { }

   ngOnInit() {
       this.getHeader();
       this.getRows();
   }

   getHeader() {
     this.tabledataService.getHeader().then( header => this.header = header);

   }

   getRows() {
       this.loading = true;
       this.tabledataService.getRows({page: this.page, limit: this.limit}).then(res => {
       this.total = res.total;
       this.rows = res.rows;
       this.loading = false;
     });
   }

  goToPage(n: number): void {
    this.page = n;
    this.getRows();
  }

  onNext(): void {
    this.page++;
    this.getRows();
  }

  onPrev(): void {
    this.page--;
    this.getRows();
  }

}
