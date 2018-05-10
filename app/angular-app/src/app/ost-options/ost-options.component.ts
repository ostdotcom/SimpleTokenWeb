import { Component, OnInit, Input } from '@angular/core';
import { EntityConfigService } from '../services/entity-config.service';

declare var $:any;

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

  /*
  * Selectpicker should always be initialized after the content for component has been render
  * ngAfterContentInit is a life cycle hook is trigger after the content init but dosent update the dom yet
  * So selectpicker is called once the dom is updated with all the options with setTimeOut
  */
  ngAfterContentInit(){
    setTimeout(function(){
        $('.selectpicker').selectpicker();
    } , 100);
  }

}
