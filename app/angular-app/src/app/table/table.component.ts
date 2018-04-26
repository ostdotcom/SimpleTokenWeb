import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OstHttp } from '../ost-http.service';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input() config:Object ;
   
   //TODO confrim default message from UX/UI
   defaultErrorMsg: String =  "Something went wrong, please try again!"
   requestPageNumber:Number = 1; 
   isLoading: Boolean = false; 
   isGetDataOnLoad: Boolean =  true; 
   hasError: Boolean = false;

   rows: Array<any> = [];
   tableDataUrl:any ; 
   deleteRowUrl:any ; 
   errorMessage: String ; 
  
   constructor(private activatedRoute: ActivatedRoute , private http: OstHttp) { }

   ngOnInit() {
     this.configOverWrites(); 
      if( this.isGetDataOnLoad ){
          this.getTableData(); 
      }
   }

   configOverWrites() {
      let oThis  = this ,
      config = this.config
      ;
      Object.assign( oThis , config ); 
   }

   public getTableData() {
    let params:RequestOptionsArgs =  this.getParams(); 
    this.isLoading =  true; 
    this.hasError = false; 
    this.http.get( this.tableDataUrl , params).subscribe(
      response => {
        let res = response.json(); 
        this.isLoading = false; 
        this.hasError = false; 
        this.onTableDataSuccess( res ); 
      },
      error => {
        let err = error.json();
        this.isLoading =  false; 
        this.hasError = true; 
        this.errorMessage = err['display_text']; 
        this.onTableDataError( err ); 
      })
   }

   public onTableDataSuccess( res ) { 
    let data      = res['data'],
        dataKey   = data && data['result_set'],
        tableData = dataKey && data[dataKey]
    ; 
    this.rows = tableData; 
   }

   public onTableDataError( errorResponse ) {
    let err = errorResponse['err']
    if( err ){
      this.errorMessage = err['display_text'] || this.defaultErrorMsg
    }
   }

   public deleteRow( data ) {
    if( !this.deleteRowUrl ) return false ; 
    let row = data['row'],
        status = data['status']
    ;
    status.isProcessing = true; 
    status.hasError = false; 
    this.http.post( this.deleteRowUrl , row ).subscribe(
      response => {
        let res = response.json()
        this.onDeleteRow( res , row ); 
       
      },
      error => {
        let err = error.json()
        status.isProcessing = false ; 
        status.hasError = true; 
        status.errMsg = err['display_text']; 
      }
    )
   }

   public onDeleteRow( res , row ){
    if( res.success ){
      let rowIndex = this.getRowIndex( row ); 
      if( rowIndex ){
        this.rows.splice( rowIndex ,  0); 
      }
    }
   }

   public insertRow( row ) {
     this.rows.unshift( row ); 
   }

   public updateRow( updatedRow , updateRowId? , mapKey? ){
     let popertyKey = mapKey || 'id' ,
         id = updateRowId || updatedRow[popertyKey],
         existingRow = this.getRowFromRows( id )
         ;
    if( existingRow ){
      existingRow = updatedRow; 
    }
   }

  /*Private function start*/
  getParams(): RequestOptionsArgs {
    return {
      params : {
        page_number : this.requestPageNumber,
        filters: {},
        sortings: {}
      },
    }
  }

  getRowIndex( row ,  key? ) { 
    let propertyKey = key || "id",
        id = (row[propertyKey]),
        index = -1 
        ; 
    for (var i = 0; i < this.rows.length; i++) {
      if (this.rows[i][propertyKey] == id) {
          index = i ; 
          break; 
      }
    }
    return index; 
  }

  getRowFromRows( id ) {
    for (var i = 0; i < this.rows.length; i++) {
        if (this.rows[i] == id) {
            return this.rows[i];
        }
    }
    return null;
  }

  /*Private function end*/ 
}
