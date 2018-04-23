import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import {tableData} from './tabledata';

class Rows {
  rows: Array<any>;
  total: number;
}

@Injectable()
export class TabledataService {
  // private tableUrl = 'https://reqres.in/api/users?page=2';
  limit = 10;
  page = 1;
  rows = [];
  status = [];
  name = 'all';

  constructor(private http: Http) { }

  getRows(paginationObj): Promise<Rows> {
    console.log(paginationObj);
    this.limit = paginationObj.limit;
    this.page = paginationObj.page;
    this.status = paginationObj.status === 'approved' ? [1] : [2, 3, 4];
    this.name = paginationObj.name;
    let rows = tableData.filter((element, index) => this.status.indexOf(element.admin_status) > -1);
    if (this.name !== 'all') {
      rows = rows.filter((element, index) => element.first_name.toLowerCase().startsWith(this.name));
    }
    this.rows = rows.slice((this.page - 1) * this.limit, this.page * this.limit);
    return Promise.resolve({rows: this.rows, total: tableData.length});
  }


  getRow(id: Number) {
    console.log( 'limit:' , this.limit , this.page);
    return this.getRows({limit: this.limit, page: this.page})
     .then(function ( res: any ) {
       const rows = res.rows ;
       for ( let i = 0 ;  i < rows.length ; i++ ) {
         if ( rows[i].id === id ) {
          return rows[i] ;
         }
       }
     });
  }

  getHeader() {
    return Promise.resolve(['Id', 'Name', 'email', 'status']);
  }

  update() {

  }


}
