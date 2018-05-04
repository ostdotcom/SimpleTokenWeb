import { Component, OnInit, Input } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';

@Component({
  selector: 'ost-select',
  templateUrl: './ost-select.component.html',
  styleUrls: ['./ost-select.component.scss']
})
export class OstSelectComponent implements OnInit {

  constructor(private entityConfigService : EntityConfigService) { }
  @Input('name') name;
  @Input('entityPath') entityPath; 
  //@Input('model') model; 

  ngOnInit() {
    console.log("name", this.name);
  }

  getOptionValues(  ){
    return this.entityConfigService.getEntityConfig(this.entityPath)['values'];
 }


}
