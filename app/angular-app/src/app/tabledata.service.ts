import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RouterModule }   from '@angular/router';
import {tableData} from './tabledata';

class Rows {
  rows : Array<any>;
  total: number;
}

@Injectable()
export class TabledataService {
  //private tableUrl = 'https://reqres.in/api/users?page=2';
  limit = 10;
  page = 1;
  rows = [];

  constructor(private http: Http) { }

  getRows(paginationObj): Promise<Rows> {
    this.limit = paginationObj.limit;
    this.page = paginationObj.page;
    this.rows = tableData.slice((this.page - 1) * this.limit, this.page * this.limit);
    return Promise.resolve({rows: this.rows, total: tableData.length});
  }


  getRow(id: Number) {
    console.log( "limit:" , this.limit , this.page);
    return this.getRows({limit:this.limit, page:this.page})
     .then(function ( res: any ) {
       let rows = res.rows ;
       for( let i = 0 ;  i < rows.length ; i++ ){
         if( rows[i].id == id ){
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
