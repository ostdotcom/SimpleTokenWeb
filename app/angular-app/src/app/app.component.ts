import { Component  } from '@angular/core';
import { AppConfigService } from './app-config.service';
import {EntityConfigService} from './entity-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor( private entityConfig: EntityConfigService){
   this.getEntityConfig();
  }

  getEntityConfig(){
  }

  // constructor( private appConfigService : AppConfigService ){
  //   appConfigService.setAppConfigs( {} );
  // }

}
