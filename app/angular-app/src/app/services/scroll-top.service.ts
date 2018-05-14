import { Injectable } from '@angular/core';

@Injectable()
export class ScrollTopService {

  constructor() { }

  scrollTop( el? ){
    let scrollEl = el || window;
    scrollEl.scrollTo(0, 0);
  }

}
