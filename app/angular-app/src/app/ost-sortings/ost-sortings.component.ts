import { Component, OnInit , Input , Output} from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'ost-sortings',
  templateUrl: './ost-sortings.component.html',
  styleUrls: ['./ost-sortings.component.scss']
})
export class OstSortingsComponent implements OnInit {

  constructor() { }

  @Input('entityName') entityName? ; 
  @Output('onSortingChangeEvent') onSortingChangeEvent? = new EventEmitter; 

  ngOnInit() {
  }

}
