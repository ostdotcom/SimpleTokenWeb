import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';


@Component({
  selector: 'manage-user-header',
  templateUrl: './manage-user-header.component.html',
  styleUrls: ['../../table/ost-header/ost-header.component.scss',  './manage-user-header.component.scss']
})
export class ManageUserHeaderComponent implements OnInit {

  constructor(private appConfigService: AppConfigService) { }

  ngOnInit() {
  }

}
