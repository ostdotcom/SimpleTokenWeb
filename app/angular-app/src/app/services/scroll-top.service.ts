import { Injectable } from '@angular/core';

declare var $:any;

@Injectable()
export class ScrollTopService {

  constructor() { }

  scrollTop( el? ){
    let scrollEl = el || window;
    scrollEl.scrollTo(0, 0);
  }

  scrollTo( toEl, fromEl?){
    fromEl.animate({
      scrollTop: $(toEl).offset().top
    }, 500)
  }



}
