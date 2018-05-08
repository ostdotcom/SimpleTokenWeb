import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-dash-board-row',
  templateUrl: './user-dash-board-row.component.html',
  styleUrls: ['./user-dash-board-row.component.scss']
})
export class UserDashBoardRowComponent implements OnInit {

  constructor() { }

  @Input('row') row: any ;

  ngOnInit() {
  }

}
