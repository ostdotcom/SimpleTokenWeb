import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }


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

}
