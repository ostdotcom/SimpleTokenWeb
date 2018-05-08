import { Component, OnInit, Input, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})

export class RowComponent {

  constructor( 
    private activatedRoute: ActivatedRoute
  ) {}

  @Input() row;

  getQueryParams(){
    return Object.assign({}, this.activatedRoute.snapshot.queryParams);
  }
  
}
