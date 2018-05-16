import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-details-row',
  templateUrl: './kyc-details-row.component.html',
  styleUrls: ['./kyc-details-row.component.scss']
})
export class KycDetailsRowComponent implements OnInit {
  @Input() row;


  constructor() { }

  ngOnInit() {
  }

}
