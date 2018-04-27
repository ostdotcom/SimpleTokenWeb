import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormsModule,  } from '@angular/forms';

@Component({
  selector: 'ost-filters',
  templateUrl: './ost-filters.component.html',
  styleUrls: ['./ost-filters.component.scss']
})
export class OstFiltersComponent extends FormsModule implements OnInit {
  
  constructor() {
    super();
   }
 
  @Input('entityName') entityName? ; 
  @Output('onFiltersChangeEvent') onFiltersChangeEvent? = new EventEmitter(); 

  ngOnInit() {
    
  }



}
