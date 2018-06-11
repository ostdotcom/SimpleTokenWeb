import { Injectable } from '@angular/core';
import { OstHttp } from './ost-http.service';
import { Response } from '@angular/http';

@Injectable()
export class EntityConfigService {
  entityConfig= {};
  entityConfigUrl = 'entity_config.json?ts='+ Date.now();
  errorOccured: Boolean;

  constructor(private http: OstHttp) {}

  load(): Promise<any> {
    this.entityConfig = null;
    return this.http
        .get(this.entityConfigUrl)
        .toPromise()
        .then((data: any) => this.entityConfig = data.json())
        .catch((err: any) => Promise.resolve());
  }

  getEntityConfig(path) {
    let paths = path.split('.')
    , current = this.entityConfig
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
