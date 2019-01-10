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
  @Input('switchCheckNo') switchCheckNo? : boolean;
  @Output('switchCheckYesSelected') switchCheckYesSelectedEvent?: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  clicked(){
    console.log('clicked');
    this.switchCheckYesSelectedEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    if (changes['switchCheckNo']) {
      if(this.switchCheckNo){
        $('.switch_yes').parent().removeClass('active');
      }
    }
  }

}
