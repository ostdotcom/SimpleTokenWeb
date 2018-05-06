import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'kyc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private appConfig : AppConfigService) { }

  ngOnInit() {
  }

}
