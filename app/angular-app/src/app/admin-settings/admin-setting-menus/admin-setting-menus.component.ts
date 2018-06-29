import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'admin-setting-menus',
  templateUrl: './admin-setting-menus.component.html',
  styleUrls: ['./admin-setting-menus.component.scss']
})
export class AdminSettingMenusComponent implements OnInit {

  isSuperAdmin;

  constructor(public router: Router, private appConfigService: AppConfigService ) { }

  ngOnInit() {
    this.isSuperAdmin = this.appConfigService.isSuperAdmin();
  }

  changeHighlightState(e){

  }

}
