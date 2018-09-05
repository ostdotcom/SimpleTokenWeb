import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-settings',
  templateUrl: './country-settings.component.html',
  styleUrls: ['./country-settings.component.scss']
})
export class CountrySettingsComponent implements OnInit {
  countryList = ['Iran', 'Iraq', 'India', 'USA', 'London', 'Russiaiiiiiighgfgfgfgfhgjhjkjkjlkljghg', 'Australia', 'Germany', 'Greece', 'China', 'Japan', 'Germany', 'Greece', 'China', 'Japan'];
  blackListedList = [];
  constructor() { }

  ngOnInit() {
  }

  downloadList(){

  }

  updateBlackList(option, event){
    if( event.target.checked ) {
      this.blackListedList.push(option);
    } else {
      this.deleteFromBlackList(option);
    }
  }

  deleteFromBlackList(option) {
    if (this.blackListedList.length > 0) {
      let index = this.blackListedList.indexOf(option);
      if (index > -1) {
        this.blackListedList.splice(index, 1);
      }
    }
  }

}
