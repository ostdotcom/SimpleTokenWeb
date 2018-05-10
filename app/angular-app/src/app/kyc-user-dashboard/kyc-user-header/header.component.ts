import { Component, OnInit, Input } from '@angular/core';
import { AppConfigService } from '../../app-config.service';

@Component({
  selector: 'kyc-user-table-header',
  templateUrl: './header.component.html',
  styleUrls: [ '../../table/ost-header/ost-header.component.scss' , './header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() header;

  constructor( public appConfigService: AppConfigService ) { }

  ngOnInit() {
  }

}
