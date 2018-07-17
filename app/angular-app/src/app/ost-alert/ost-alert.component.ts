import { Component, OnInit, Input } from '@angular/core';

declare var $:any; 

@Component({
  selector: 'ost-alert',
  templateUrl: './ost-alert.component.html',
  styleUrls: ['./ost-alert.component.scss']
})
export class OstAlertComponent implements OnInit {

  @Input("alertStyleClass")  alertStyleClass : string     = null
  @Input("alertMessage")     alertMessage    : string     = null
  @Input("viewMoreList")     viewMoreList    : Array<any> = null;

  isCollapsed:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.isCollapsed = !this.isCollapsed;
  }

}
