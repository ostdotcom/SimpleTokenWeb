import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
    data:object = {}; 

    setAppInitData( data:object ){
        this.data = data; 
    }

    getAppInitData( data ):object {
       return this.data ; 
    }


}