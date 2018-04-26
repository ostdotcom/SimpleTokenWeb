import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'table-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() totalPageCount: number;
  @Output('pageChangeEvent') pageChangeEvent = new EventEmitter<number>();

  currentPageNumber:number = 1; 
  constructor() { }


  changePage(pageCount: number): void {
    console.log("changePage" , pageCount ); 
    this.currentPageNumber  = pageCount ; 
    this.pageChangeEvent.emit( this.currentPageNumber );
  }

  onPrev(): void {
    --this.currentPageNumber; 
    this.pageChangeEvent.emit( this.currentPageNumber );
    console.log("onPrev" , this.currentPageNumber ); 
  }

  onNext(): void {
    ++this.currentPageNumber;
    this.pageChangeEvent.emit( this.currentPageNumber );
    console.log("onNext" , this.currentPageNumber ); 
  }

  isNext(): boolean{
    return this.currentPageNumber < this.totalPageCount; 
  }

  isPrev(): boolean{
    return this.currentPageNumber > 2; 
  }

  isActive( index ):boolean{
   return this.changePage == index; 
  }

  getPages() {
    let pages = [];
    for(let i = 1 ; i <= this.totalPageCount ;  i++){
      pages.push(i); 
    }
    return pages; 
  }

 
}
