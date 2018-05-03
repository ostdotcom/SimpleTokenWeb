import { Component, OnInit, Input, Output } from '@angular/core';
import { OstHttp } from '../ost-http.service';

@Component({
  selector: 'kyc-search',
  templateUrl: './kyc-search.component.html',
  styleUrls: ['./kyc-search.component.scss']
})
export class KycSearchComponent implements OnInit {

  constructor(private http : OstHttp) { }

  //Mandatory options to pass 
  @Input('searchApi')  searchApi      : string; 
  @Input('entityName') entityName     : string;
  @Input('placeholder') placeholder?  : string;

  //Optional options to pass
  @Input('config') config?: string;

  items : Array<any> = []; 
  searchValue: string = null; 
  isSearching: boolean = false;
  hasError: boolean = false; 
  errMsg: string = "Sorry no results found!"
  searchTimeOut; 

  ngOnInit() {
    this.placeholder = this.placeholder || "Search"
  }

  onSearch( searchForm ){
    this.updateRequestProcessingStatus( true , false );
    clearTimeout( this.searchTimeOut ); 
    this.searchTimeOut = setTimeout(() => {
      this.http.get( this.searchApi ,  {params : searchForm.value } ).subscribe(
        response => {
          console.log("has success", response); 
          let res = response.json(); 
          this.onSuccess( res ); 
        },
        error => {
          console.log("has error", error); 
          let err = error.json(); 
          this.onError( err ); 
        }
      )
    } , 300) ;
  }

  onSuccess( response ) {
    if( response.success ){
      let data =response['data'],
      dataKey = data && data['result_set'],
      searchData = dataKey && data[dataKey]
      ;
      this.items = searchData;
      this.updateRequestProcessingStatus( false , false ); 
    }else{
      this.updateRequestProcessingStatus( false , true , response ); 
    }
  }

  onError(error) {
    this.updateRequestProcessingStatus( false , true ,  error ); 
  }

  updateRequestProcessingStatus( isSearching: boolean ,  hasError: boolean , error?: object ){
    this.isSearching = isSearching ; 
    this.hasError = hasError; 
    if( error ){
      this.errMsg =  error['err'] && error['err']['display_text'] ; 
    }
  } 

}
