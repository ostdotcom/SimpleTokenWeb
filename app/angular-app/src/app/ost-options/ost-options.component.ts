import { Component, OnInit, Input } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';

@Component({
  selector: '[ostOptions]',
  templateUrl: './ost-options.component.html',
  styleUrls: ['./ost-options.component.scss']
})
export class OstOptionsComponent implements OnInit {

  constructor(private entityConfigService : EntityConfigService) { }

  @Input('entityPath') entityPath:string; 

  options: Array<any>

  ngOnInit() {
    this.options = this.entityConfigService.getEntityConfig(this.entityPath)['values'];
  }

}
