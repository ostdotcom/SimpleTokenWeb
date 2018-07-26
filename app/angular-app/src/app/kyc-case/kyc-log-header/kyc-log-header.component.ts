import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-log-header',
  templateUrl: './kyc-log-header.component.html',
  styleUrls: ['../../table/ost-header/ost-header.component.scss', './kyc-log-header.component.scss']
})

export class KycLogHeaderComponent {

  @Input('lastActedByName') lastActedByName : string = null; 
}
