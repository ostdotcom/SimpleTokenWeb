import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { OstHttp } from '../ost-http.service';
import { RequestStateHandlerService } from '../request-state-handler.service';

@Component({
  selector: 'kyc-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
  host: {
    '(document:click)': 'handleClickEvent($event)'
  }
})
export class NavbarSearchComponent implements OnInit {

  constructor(private http : OstHttp, private _eref: ElementRef , private stateHandler: RequestStateHandlerService) { }

  //Mandatory options to pass
  @Input('searchApi')  searchApi      : string;
  @Input('entityName') entityName     : string;
  @Input('placeholder') placeholder?  : string;

  //Optional options to pass
  @Input('config') config?: string;

  items : Array<any> = [];
  searchValue: string = null;
  isProcessing: boolean = false;
  hasError: boolean = false;
  noResultFound: boolean = false;
  hideResponse: boolean= true; 
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
      this.stateHandler.updateRequestStatus(this, false , false , false); 
    }
  }

  preSearch(){
    this.items = [];
    this.hideResponse = false ; 
    clearTimeout( this.searchTimeOut );
  }

  sendSearchRequest(searchForm){
    this.stateHandler.updateRequestStatus(this, true , false , false); 
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
      searchData = dataKey && data[dataKey],
      noResultFound = false
      ;
      this.items = searchData;
      if( this.items.length == 0 ){
        noResultFound =  true;
      }
      this.stateHandler.updateRequestStatus(this, false , false , noResultFound);
    }else{
      this.stateHandler.updateRequestStatus(this, false , true , false, response );
    }
  }

  onError(error) {
    this.stateHandler.updateRequestStatus(this, false , true ,  error );
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
