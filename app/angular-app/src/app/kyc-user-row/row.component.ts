import { Component, OnInit, Input, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})

export class RowComponent implements OnInit {



  constructor(
    private activatedRoute: ActivatedRoute,
    public appConfigService : AppConfigService
  ) {}

  ngOnInit(){
    this.row.submission_count = this.getOrdinalNum(this.row.submission_count);
  }

  @Input() row;

  getQueryParams(){
    return Object.assign({}, this.activatedRoute.snapshot.queryParams);
  }


  getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }


}
