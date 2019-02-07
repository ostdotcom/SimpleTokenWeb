import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ost-toggle',
  templateUrl: './ost-toggle.component.html',
  styleUrls: ['./ost-toggle.component.scss']
})
export class OstToggleComponent implements OnInit {

  @Input('labelTxt') labelTxt : string = '';
  @Input('modelValue') modelValue : number = 0;
  @Input('nameStr') nameStr : string = '';

  constructor() { }

  ngOnInit() {
  }

}
