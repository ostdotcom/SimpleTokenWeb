import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  q: string;
  placeholder: string = 'Search By Email';


  constructor() { }

  ngOnInit() {
  }

  onSearch(e) {
    console.log('ab');

  }

  onPageChange ( pageNumber ) {
    var page = {
      page_number: pageNumber
    };

  }

  onFilterChange(f) {
    console.log(f.value);
    console.log('hey');
  }

}
