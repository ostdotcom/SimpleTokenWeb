import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor() { }

  ngOnInit() {
    this.year =  new Date().getFullYear();
  }

}
