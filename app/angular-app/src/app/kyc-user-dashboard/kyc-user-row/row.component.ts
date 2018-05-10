import { Component, OnInit, Input, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'kyc-user-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})

export class RowComponent implements OnInit {

  @Input() row;
  duplicateReasonHash = {'email': 'Same Email ID',
                       'document_id_with_country': 'Same Doc ID with Country',
                       'only_document_id': 'Same Doc ID',
                       'ethereum_address': 'Same Eth Address',
                       'address': 'Same Address'
                      };



  constructor(
    private activatedRoute: ActivatedRoute,
    public appConfigService: AppConfigService
  ) {}

  ngOnInit() {
    this.row.submission_count = this.getOrdinalNum(this.row.submission_count);
    this.row.duplicate_type = this.duplicateReasonHash[this.row.duplicate_type];
  }

  getQueryParams() {
    return Object.assign({}, this.activatedRoute.snapshot.queryParams);
  }
  getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }
}
