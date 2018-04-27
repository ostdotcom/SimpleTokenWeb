import { Component, OnInit, Input }  '@angular/core';
import { NgSelectOption } from '@angular/forms';

@Component({
  selector: 'ost-select',
  templateUrl: './ost-select.component.html',
  styleUrls: ['./ost-select.component.scss']
})
export class OstSelectComponent implements OnInit {

  constructor(entityConfigService : EntityConfigService) {
   }

  @Input('entity') entity ; 
  @Input('entityName') entityName; 
  @Input('errorMessage') errorMessage?; 
  @Input('validation') validation?; 

  defaultError = "Please select options" //TODO get required copy from UX 
  selectedValue: any ; 

  ngOnInit() {
     this.entity = entityConfigService.getEntityConfig( this.entity ); 
  }

  getOptions() {
    return this.entity['values'] || []; 
  }

  getError(): string{
    return this.errorMessage || this.defaultError ; 
  }

  isRequired():boolean {
    return this.validation['required'] || false ; 
  }

}
