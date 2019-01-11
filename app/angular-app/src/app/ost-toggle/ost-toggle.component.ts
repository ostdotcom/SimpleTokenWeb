import { Component, OnInit, Input , EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

declare var $:any;

@Component({
  selector: 'ost-toggle',
  templateUrl: './ost-toggle.component.html',
  styleUrls: ['./ost-toggle.component.scss']
})
export class OstToggleComponent implements OnInit, OnChanges {

  constructor() { }

  @Input('switchName') switchName : string;
  @Input('switchLabelYes') switchLabelYes : string;
  @Input('switchLabelNo') switchLabelNo : string;
  @Input('switchSelectNo') switchSelectNo? : boolean;
  @Output('switchYesSelected') switchYesSelectedEvent: EventEmitter<any> = new EventEmitter();
  @Output('switchNoSelected') switchNoSelectedEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  selectedYes(){
    this.switchYesSelectedEvent.emit();
  }

  selectedNo(){
    this.switchNoSelectedEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['switchSelectNo']) {
      if(this.switchSelectNo){
        $('.switch_yes').parent().removeClass('active');
      }
    }
  }

}
