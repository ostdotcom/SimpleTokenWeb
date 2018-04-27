import { Injectable } from '@angular/core';
import { OstHttp } from './ost-http.service';
import { entityConfig } from './entity-config';



@Injectable()
export class EntityConfigService {
  entityConfig= {};
  entityConfigUrl = 'entity_config.json';
  errorOccured: Boolean;

  constructor(private http: OstHttp) {
   // this.getEntityConfig('');
  }

  // getEntityConfig() {
  //   this.http.get(this.entityConfigUrl)
  //   .subscribe((success) => {
  //     this.entityConfig = success.json();
  //     console.log(this.entityConfig);
  //   });
  // }

  getEntityConfig(path) {
    let paths = path.split('.')

    , current = entityConfig
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
