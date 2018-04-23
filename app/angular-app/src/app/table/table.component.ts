import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { TabledataService } from '../tabledata.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() filterTemplate: TemplateRef<any>;

   rows = []; header = [];

  loading = false;
  total = 0;
  page = 1;
  limit = 20;
  queryParams = {};

   constructor(private tabledataService: TabledataService, private activatedRoute: ActivatedRoute) {
   }

   ngOnInit() {
       this.getHeader();
       this.activatedRoute.queryParams.subscribe(queryParams => {
         this.queryParams = queryParams;
        this.getRows();
      });
   }

   getHeader() {
     this.tabledataService.getHeader().then( header => this.header = header);

   }

   getRows() {
       this.loading = true;
       this.tabledataService.getRows({page: this.page, limit: this.limit, ...this.queryParams}).then(res => {
       this.total = res.total;
       this.rows = res.rows;
       this.loading = false;
     });
   }

  goToPage(n: number): void {
    console.log(n);
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
