import { Component, OnInit, Input } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'dashboard-table-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../ost-header/ost-header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() header;

  constructor( public appConfigService: AppConfigService ) { }

  ngOnInit() {
  }

}
