import { Component, OnInit, Output, Input } from '@angular/core';
import { EntityConfigService } from '../entity-config.service';


@Component({
  selector: 'ost-select',
  templateUrl: './ost-select.component.html',
  styleUrls: ['./ost-select.component.scss']
})

export class OstSelectComponent implements OnInit {

  constructor(private entityConfigService : EntityConfigService) {
   } 

  @Input('entity') entity ;
  @Input('entityName') entityName;
  @Input('errorMessage') errorMessage?;
  @Input('validation') validation?;

  entityConfig:any;

  defaultError = "Please select options" //TODO get required copy from UX
  selectedValue: any ;

  ngOnInit() {
     this.entityConfig = this.entityConfigService.getEntityConfig( this.entity );
  }

  getError(): string{
    return this.errorMessage || this.defaultError ;
  }

  isRequired():boolean {
    return this.validation['required'] || false ;
  }

}
