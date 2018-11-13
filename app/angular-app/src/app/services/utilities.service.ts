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

  copyToClipboard( contentToCopy, callback) {
    if( !contentToCopy ) return;
    let tempInput = document.createElement('input');
    document.body.appendChild( tempInput );
    tempInput.value = contentToCopy;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    if( callback && typeof callback == 'function') {
      callback();
    }
  }

}
