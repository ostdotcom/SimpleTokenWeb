import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ost-input-number',
  templateUrl: './ost-input-number.component.html',
  styleUrls: ['./ost-input-number.component.scss']
})
export class OstInputNumberComponent implements OnInit {

  textToAppend : string = '';

  constructor() { }

  ngOnInit() {
  }

}
