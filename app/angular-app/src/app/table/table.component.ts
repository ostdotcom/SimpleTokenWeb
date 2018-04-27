import { Component, OnInit, Input , TemplateRef} from '@angular/core';
import { OstHttp } from '../ost-http.service';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent  implements OnInit {
  @Input('tableType') tableType? : string;
  @Input('filters') filters?   : any;
  @Input('sortings') sortings?  : any;
  @Input('config') config?     : Object;


   //TODO confrim default message from UX/UI
   errMsg: String =  "Something went wrong, please try again!"
   isProcessing: Boolean = false;
   isGetDataOnLoad: Boolean =  true;
   hasError: Boolean = false;
   rows: Array<any> = [];
   tableDataUrl:any ;
   deleteRowUrl:any ;
   metaData: Object;

   constructor(private http: OstHttp) {}

   ngOnInit() {
     this.configOverWrites();
      if( this.isGetDataOnLoad ){
          let params = this.getParams();
          this.getTableData( params );
      }
      
      this.sortings.valueChanges.subscribe( data => {
        console.log("Sorting values has been changed");
      });

      this.filters.valueChanges.subscribe( data => {
        console.log("Filters values has been changed");
      });
   }


   configOverWrites() {
      let oThis  = this ,
      config = this.config
      ;
      Object.assign( oThis , config );
   }

   getTableDataOnPageChange( pageNumber ){
     console.log("getTableDataOnPageChange" , pageNumber);
    let params:RequestOptionsArgs =  this.getParams( pageNumber );
    this.getTableData( params );
   }

   getParams(pageNumber? , filters? , sorting? ): RequestOptionsArgs {
    return {
      params : {
        page_number : pageNumber || 1,
        filters: filters,
        sortings: sorting
      },
    }
  }

   getTableData( params ) {
    this.updateDataProcessingStatus(this , true , false );
    this.http.get( this.tableDataUrl , params).subscribe(
      response => {
        let res = response.json();
        this.updateDataProcessingStatus(this , false , false );
        this.onTableDataSuccess( res );
      },
      error => {
        let err = error.json();
        this.updateDataProcessingStatus(this , false , true,  err['display_text']);
        this.onTableDataError( err );
      })
   }

   onTableDataSuccess( res ) {
    let data      = res['data'],
        dataKey   = data && data['result_set'],
        tableData = dataKey && data[dataKey]
    ;
    this.rows = tableData;
    this.metaData = data['meta'];
   }

   onTableDataError( errorResponse ) {
    let err = errorResponse['err'];
    if( err ){
      this.updateDataProcessingStatus(this , false , true,  err['display_text']);
    }
   }

   deleteRow( data ) {
    if( !this.deleteRowUrl ) return false ;
    let row = data['row'],
        status = data['status']
    ;
    this.updateDataProcessingStatus(status ,  true, false );
    this.http.post( this.deleteRowUrl , row ).subscribe(
      response => {
        let res = response.json();
        this.onDeleteRow( res , row );
        this.updateDataProcessingStatus(status ,  false, false );
      },
      error => {
        let err = error.json();
        this.updateDataProcessingStatus(status ,  false, true , err['display_text']);
      }
    )
   }

   updateDataProcessingStatus( context , isProcessing:boolean , hasError:boolean , errMsg?){
    context['isProcessing'] = isProcessing;
    context['hasError']     = hasError;
    context['errMsg']       = errMsg || context['errMsg'] ;
   }

   onDeleteRow( res , row ){
    if( res.success ){
      let rowIndex = this.getRowIndex( row );
      if( rowIndex ){
        this.rows.splice( rowIndex ,  0);
      }
    }
   }

   insertRow( row ) {
     this.rows.unshift( row );
   }

   updateRow( updatedRow , updateRowId? , mapKey? ){
     let popertyKey = mapKey || 'id' ,
         id = updateRowId || updatedRow[popertyKey],
         existingRow = this.getRowFromRows( id )
         ;
    if( existingRow ){
      existingRow = updatedRow;
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

  isPagination(): Boolean {
    return this.getTotalPageCount() > 1 ? true : false ;
  }

  getTotalPageCount(): Number {
    if( !this.metaData ) return 0;
    let pageSize      =  Number(this.metaData['page_size']),
        totalRecords  =  Number(this.metaData['total_records']),
        totalPageCount=  Math.ceil( totalRecords / pageSize)
    ;
    return totalPageCount;
  }
}
