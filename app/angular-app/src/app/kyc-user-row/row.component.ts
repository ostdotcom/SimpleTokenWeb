import { Component, OnInit, Input, Pipe } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})

export class RowComponent implements OnInit {

    @Input() row;

    ngOnInit() {
    }

   
}
