import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'table-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent {
  @Input() totalPageCount: number;
  @Input() currentPageNumber: number

  @Output('pageChangeEvent') pageChangeEvent = new EventEmitter<number>();

  constructor() { }

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
    return this.currentPageNumber > 2;
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
