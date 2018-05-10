import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'table-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent {
  @Input('totalPageCount') totalPageCount: number;
  @Input('currentPageNumber') currentPageNumber: number;
  @Input('metaData') metaData; 

  @Output('pageChangeEvent') pageChangeEvent = new EventEmitter<number>();

  constructor() { }

  loading: boolean = false;

  changePage(pageNumber: number): void {
    this.currentPageNumber  = pageNumber ;
    this.pageChangeEvent.emit( this.currentPageNumber );
  }

  onPrev(): void {
    --this.currentPageNumber;
    this.pageChangeEvent.emit( this.currentPageNumber );
  }

  onNext(): void {
    ++this.currentPageNumber;
    this.pageChangeEvent.emit( this.currentPageNumber );
  }

  isNext(): boolean{
    return this.currentPageNumber < this.totalPageCount;
  }

  isPrev(): boolean{
    return this.currentPageNumber > 1;
  }

  isActive( index ):boolean{
   return this.currentPageNumber == index;
  }

  getPages() {
    let pages = [];
    for(let i = 1 ; i <= this.totalPageCount ;  i++){
      pages.push(i);
    }
    return pages;
  }


}
