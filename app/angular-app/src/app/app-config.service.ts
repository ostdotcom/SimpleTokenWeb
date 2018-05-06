import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
    data:object = {}; 

    setAppInitData( data:object ){
        console.log("data====", data);
        this.data = data; 
    }

    getAppInitData( data ):object {
       return this.data ; 
    }

    getLoggedInUserName() {
        let admin = this.data && this.data['admin']; 
        return admin && admin['email'] || "";   
    }

}