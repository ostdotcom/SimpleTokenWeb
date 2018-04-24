import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})


export class FilterComponent implements OnInit {

  @Input() filterInfo;
  @Input() dynamicVar;
  selectedValue = '';

  @Output() changeFilter = new EventEmitter<any>();

  constructor(http : Http) { 
  }

  handleChange($event) {
    this.changeFilter.emit({id: this.filterInfo.id , selectedValue: this.selectedValue});
  }

  ngOnInit() {
    this.selectedValue = this.filterInfo.selected;
  }

}


