import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'admin-setting-menus',
  templateUrl: './admin-setting-menus.component.html',
  styleUrls: ['./admin-setting-menus.component.scss']
})
export class AdminSettingMenusComponent implements OnInit {

selectedMenu = 'admin';

  constructor() { }

  ngOnInit() {
  }

  changeHighlightState(e){
    this.selectedMenu = $(e.target).data('menu');
  }

}
