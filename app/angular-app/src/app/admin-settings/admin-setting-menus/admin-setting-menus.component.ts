import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'admin-setting-menus',
  templateUrl: './admin-setting-menus.component.html',
  styleUrls: ['./admin-setting-menus.component.scss']
})
export class AdminSettingMenusComponent implements OnInit {

  show:boolean;


  constructor(public router: Router) { }

  ngOnInit() {
    this.show=true;
  }

  changeHighlightState(e){

  }
  toggleShow(){
      this.show = !this.show;
  }


}
