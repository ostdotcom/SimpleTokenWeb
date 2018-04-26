import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OstHttp } from '../ost-http.service';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() tableType: string;
  @Input() config: Object ;
   // TODO confrim default message from UX/UI
   defaultErrorMsg: String =  'Something went wrong, please try again!';
   requestPageNumber: Number = 1;
   isLoading: Boolean = false;
   isGetDataOnLoad: Boolean =  true;
   header: Array<any> = [];
   rows: Array<any> = [];
   tableDataUrl ;
   errorMessage: String ;
   constructor(private activatedRoute: ActivatedRoute , private http: OstHttp) {
   }

   ngOnInit() {
     this.configOverWrites();
      if ( this.isGetDataOnLoad ) {
          this.isLoading = true;
          this.getTableData();
          console.log('table getting init');
      }
   }

   configOverWrites() {
      let oThis  = this ,
      config = this.config
      ;
      Object.assign( oThis , config );
   }

   getTableData() {
    let params: RequestOptionsArgs =  this.getParams();
    this.isLoading =  true;
    console.log('this.tableDataUrl' , this.tableDataUrl);
    this.http.get( this.tableDataUrl , params).subscribe(
      response => {
        let res = response.json();
        console.log("response" , res);
        this.onSuccess( res );
      },
      error => {
        let err = error.json()
        this.onError( err );
      }
    )
   }

   getParams(): RequestOptionsArgs {
    return {
      params : {
        page_number : this.requestPageNumber,
        filters: {},
        sortings: {}
      },
    }
   }

   onSuccess( res ) {
     console.log( "table data " ,  res );
    let data      = res['data'],
        dataKey   = data && data['result_set'],
        tableData = dataKey && data[dataKey]
    ;
    this.isLoading =  false;
    this.rows = tableData;
    console.log("this.rows" , this.rows);
   }

   onError( errorResponse ) {
    let err = errorResponse['err']
    this.isLoading =  false;
    if( err ){
      this.errorMessage = err['display_text'] || this.defaultErrorMsg
    }
   }
}
