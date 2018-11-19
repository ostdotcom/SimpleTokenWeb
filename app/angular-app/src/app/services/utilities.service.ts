import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class UtilitiesService {

  pathToExclude: string = 'settings/';

  constructor(private router: Router) { }


  deepGet(data , path) {

    if(!data || !path ){
      return false;
    }

    let paths = path.split('.')
    , current = data
    , i
    ;
    for (i = 0; i < paths.length; ++i) {
      if (current[paths[i]] == undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }

  isSettingPage() {
    let url = this.router.url;
    return url.indexOf( this.pathToExclude )  > -1 ;
  }

}
