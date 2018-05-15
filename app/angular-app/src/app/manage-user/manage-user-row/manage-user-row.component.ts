import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'manage-user-row',
  templateUrl: './manage-user-row.component.html',
  styleUrls: ['./manage-user-row.component.scss']
})
export class ManageUserRowComponent implements OnInit {

  @Input() row;
  constructor() { }

  ngOnInit() {
  }

}
