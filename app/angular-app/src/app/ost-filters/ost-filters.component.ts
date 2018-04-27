import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'ost-filters',
  templateUrl: './ost-filters.component.html',
  styleUrls: ['./ost-filters.component.scss']
})
export class OstFiltersComponent implements OnInit {

  constructor() { }

  @Input('entityName') entityName ;

  ngOnInit() {

  }

}
