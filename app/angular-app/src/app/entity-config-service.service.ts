import { Injectable } from '@angular/core';
import { OstHttp } from './ost-http.service';
import {entityConfig} from './entity_config';


@Injectable()
export class EntityConfigService {
  entityConfig;
  entityConfigUrl = 'entity_config.json';
  errorOccured: Boolean;

  constructor(private http: OstHttp) {
    this.entityConfig = this.getConfiguration();

  }

  getConfiguration() {
    return entityConfig;
  }



}
