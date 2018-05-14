import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { OstHttp } from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

@Component({
  selector: 'ost-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: {
    '(document:click)': 'handleClickEvent($event)'
  }
})
export class OstSearchComponent implements OnInit {

  constructor(private http : OstHttp, private _eref: ElementRef , private stateHandler: RequestStateHandlerService) { }

  //Mandatory options to pass
  @Input('searchApi')  searchApi      : any;
  @Input('entityName') entityName     : any;
  @Input('placeholder') placeholder?  : any = "Search by email";

  //Optional options to pass
  @Input('config') config?: string;

  items : Array<any> = [];
  searchValue: any = "";
  previousValue: any = ""
  isProcessing: boolean = false;
  hasError: boolean = false;
  hasWarning: boolean = false;
  hideResponse: boolean= true;
  errorMessage: string = "Sorry no results found!";
  searchTimeOut;

  ngOnInit() {}

  onSearch( searchForm ){
    if( this.isToSearch() ){
      this.preSearch();  
      this.sendSearchRequest(searchForm) ;
    }else{
      this.stateHandler.updateRequestStatus(this, false , false , false);
    }
  }

  isToSearch(){
    return !!this.searchValue  && this.searchValue.trim().length >= 3  &&
            this.previousValue.trim() != this.searchValue.trim(); 
  }

  preSearch(){
    this.items = [];
    this.hideResponse = false ;
    this.searchValue = this.searchValue.trim(); 
    this.previousValue = this.searchValue ; 
    clearTimeout( this.searchTimeOut );
  }

  sendSearchRequest(searchForm){
    this.stateHandler.updateRequestStatus(this, true , false , false);
    this.searchTimeOut = setTimeout(() => {
      if(!this.searchValue) return ; 
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
      hasWarning = false
      ;
      this.items = searchData;
      if( this.items.length == 0 ){
        hasWarning =  true;
      }
      this.stateHandler.updateRequestStatus(this, false , false , hasWarning);
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
    this.searchValue = "";
  }

}
