import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { OstHttp } from '../ost-http.service';

@Component({
  selector: 'kyc-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
  host: {
    '(document:click)': 'handleClickEvent($event)'
  }
})
export class NavbarSearchComponent implements OnInit {

  constructor(private http : OstHttp, private _eref: ElementRef) { }

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
  noResultFound: boolean = false;
  hideResponse: boolean= false; 
  errMsg: string = "Sorry no results found!";
  searchTimeOut;

  ngOnInit() {
    this.placeholder = this.placeholder || "Search"
  }

  onSearch( searchForm ){
    this.preSearch(); 
    if( this.searchValue ){
      this.sendSearchRequest(searchForm) ; 
    }else{
      this.updateRequestProcessingStatus(false , false); 
    }
  }

  preSearch(){
    this.items = [];
    this.noResultFound = false;
    this.hideResponse = false ; 
    clearTimeout( this.searchTimeOut );
  }

  sendSearchRequest(searchForm){
    this.updateRequestProcessingStatus(true , false); 
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
      if( this.items.length == 0 ){
        this.noResultFound = true;
      }
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

  isSearchResponse():boolean{
   return  !!this.items.length || this.isSearching || this.hasError || this.noResultFound ;
  }


  handleClickEvent( event ){
    if (this._eref.nativeElement.contains(event.target)){
        this.hideResponse = false; 
    }else{
        this.hideResponse = true; 
    }
  }

  onSearchItemClick(){
    this.hideResponse = true; 
  }

}
