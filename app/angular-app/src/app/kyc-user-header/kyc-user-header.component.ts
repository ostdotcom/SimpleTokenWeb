import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-user-header',
  templateUrl: './kyc-user-header.component.html',
  styleUrls: ['./kyc-user-header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() header;

  constructor() { }

  ngOnInit() {
  }

}
