import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ost-alert',
  templateUrl: './ost-alert.component.html',
  styleUrls: ['./ost-alert.component.scss']
})
export class OstAlertComponent implements OnInit {

  @Input("alertStyleClass")  alertStyleClass : string     = null
  @Input("alertMessage")     alertMessage    : string     = null
  @Input("viewMoreList")     viewMoreList    : Array<any> = null;

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
