import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RouterModule }   from '@angular/router';
import {tableData} from './tabledata';


@Injectable()
export class TabledataService {
  //private tableUrl = 'https://reqres.in/api/users?page=2';


  constructor(private http: Http) { }

  getRows() {

    // return this.http.get(this.tableUrl)
    //   .toPromise()
    //   .then(response => response.json().data);
    //   //.catch(this.handleError);

    return Promise.resolve(tableData);
  }


  getRow(id: Number) {
    return this.getRows()
      .then(rows => rows.find(row => row.id === id));

  }

  getHeader() {
    return Promise.resolve(['Name', 'email', 'status']);
  }

  update(row) {
    return this.getRows();
    //     .then( function ( rows ) {
    //         rows.forEach( function ( iter_row ) {
    //             if (iter_row === row)
    //             {
    //                 iter_row = row;
    //             }
    //         }
    //     })
    //     .then(rows => rows.forEach( iter_row => {if (iter_row === row) {iter_row = row; }} ));
  }


}
