import { Component, OnInit, Input , TemplateRef} from '@angular/core';
import { OstHttp } from '../ost-http.service';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent  implements OnInit {
  
  //Mandatory input options 
  @Input('dataUrl')     dataUrl   : string ; 

  //Optional input options 
  @Input('tableType')     tableType?    : string  = null;
  @Input('filterForm')    filterForm?   : any     = null ;
  @Input('sortForm')      sortForm?     : any     = null;
  @Input('config')        config?       : object  = null;
  @Input('deleteRowUrl')  deleteRowUrl? : string  = null; 

   // TODO confrim default message from UX/UI
   rows: Array<any> = [];
   errMsg: string =  'Something went wrong, please try again!';
   isProcessing: boolean = false;
   getDataOnLoad: boolean =  true;
   hasError: boolean = false;
   metaData: object;
   pageCnt: number = 1; 
   filterOptions: any; 
   sortingOptions: any; 

   constructor(private http: OstHttp) {}

   ngOnInit() {
    this.configOverWrites();
   }

   ngAfterContentInit() {
    if(this.getDataOnLoad){
      this.getTableData(); 
     }
   }

   configOverWrites() {
    if(!this.config) return ;  
    let oThis  = this ,
    config = this.config
    ;
    Object.assign( oThis , config );
  }

   initFilters(){
    if(!this.filterForm) return ;  
    this.filterForm.valueChanges.subscribe( data => {
      console.log("Filters values has been changed", data);
      this.onFilter(data); 
    });
   }

   initSorting(){
    if(!this.sortForm) return ;  
    this.sortForm.valueChanges.subscribe( data => {
      console.log("Sorting  values has been changed", data);
      this.onSorting(data); 
    });
   }

   onFilter(data){
    this.resetPageCount();
    this.setFilter( data ); 
    this.getTableData( );
   }

   onSorting(data){
    this.resetPageCount();
    this.setSorting( data ); 
    this.getTableData( );
   }

   setFilter( data ){
      this.filterOptions = data; 
   }

   setSorting(data ){
    return this.sortingOptions = data; 
  }

  getFilter(){
    return this.filterOptions; 
  }

  getSorting(){
   return this.sortingOptions; 
  }

  onPageChange( pageNumber: number){
  this.setPageCount(pageNumber)
    this.getTableData( );
  }


  setPageCount( pageNumber : number ){
   this.pageCnt = pageNumber; 
  }

  resetPageCount(){
    this.pageCnt =  1; 
  }

  getPageCount(): number {
    return this.pageCnt
  }

  getParams( ): RequestOptionsArgs {
     let requestParams =  {
      params : {
        page_number : this.getPageCount()
      }
    }
    if(this.filterOptions){
      Object.assign(requestParams['params'] , this.getFilter());
    }
    if(this.sortingOptions){
      Object.assign(requestParams['params'] , this.getSorting());
    }
    return requestParams ; 
  }

   getTableData( ) {
    let params:RequestOptionsArgs =  this.getParams();
    this.updateDataProcessingStatus(this , true , false );
    this.http.get( this.dataUrl , params).subscribe(
      response => {
        let res = response.json();
        this.onTableDataSuccess( res );
      },
      error => {
        let err = error.json();
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
    this.bindTableChangeEvents(); 
    this.updateDataProcessingStatus(this , false , false );
   }

   eventsBinded: boolean =  false; 
   bindTableChangeEvents(){
    if( !this.eventsBinded ){
      this.initFilters(); 
      this.initSorting(); 
      this.eventsBinded = true; 
    }
   }

   onTableDataError( errorResponse ) {
    let err = errorResponse['err'];
    if( err ){
      this.updateDataProcessingStatus(this , false , true,  err['display_text']);
    }
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

  updateDataProcessingStatus( context , isProcessing:boolean , hasError:boolean , errMsg?){
    if(!context) return ; 
    context['isProcessing'] = isProcessing;
    context['hasError']     = hasError;
    context['errMsg']       = errMsg || context['errMsg'] ;
   }

    /*========UN-tested code start=====*/

    deleteRow( data ) {
      if( !this.deleteRowUrl ) return false ;
      let id = data['id'],
          status = data['status']
      ;
      this.updateDataProcessingStatus(status ,  true, false );
      this.http.post( this.deleteRowUrl , id ).subscribe(
        response => {
          let res = response.json();
          this.onDeleteRowSuccess( res , id );
          this.updateDataProcessingStatus(status ,  false, false );
        },
        error => {
          let err = error.json();
          this.onDeleteRowFailure(err); 
          this.updateDataProcessingStatus(status ,  false, true , err['display_text']);
        }
      )
     }

     onDeleteRowSuccess( res , id ){
      if( res.success ){
        let rowIndex = this.getRowIndex( id );
        if( rowIndex ){
          this.rows.splice( rowIndex ,  1);
        }
      }
     }

     onDeleteRowFailure(err){
      console.log("overwrite if needed from outside", err); 
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
  
    getRowIndex( id) :number{
      let row , 
          index: number = -1; 
      for (var i = 0; i < this.rows.length; i++) {
        row = this.rows[i]
        if (row[id] == id) {
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
    /*========UN-tested code end*=====*/
}
