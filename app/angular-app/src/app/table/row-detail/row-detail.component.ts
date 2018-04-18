import { Component, OnInit, Input } from '@angular/core';
import {RowComponent} from '../row/row.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {TabledataService} from '../../tabledata.service';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-row-detail',
  templateUrl: './row-detail.component.html',
  styleUrls: ['./row-detail.component.css']
})
export class RowDetailComponent implements OnInit {

  @Input() row: any;

  constructor(private tabledataService: TabledataService,
              private route: ActivatedRoute,
              private location: Location
  ) {  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tabledataService.getRow(+params.get('id')))
      .subscribe(row => this.row = row);
  };

  save(): void{
    this.tabledataService.update(this.row)
      .then(() => this.goBack());
  };

  test(): string{
      return 'mutation';
  };

  goBack(): void{
    this.location.back();
  }



}
