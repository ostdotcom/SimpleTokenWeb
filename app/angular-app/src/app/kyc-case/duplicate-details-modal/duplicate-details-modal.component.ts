import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-duplicate-details-modal',
  templateUrl: './duplicate-details-modal.component.html',
  styleUrls: ['../../table-modal-base/base-modal.component.scss', './duplicate-details-modal.component.scss']
})
export class DuplicateDetailsModalComponent implements OnInit {
  @Input() caseId;
  duplicateDataUrl;

  constructor() { }

  ngOnInit() {
    this.duplicateDataUrl = 'api/admin/kyc/fetch-duplicate?id=' + this.caseId;

  }

}
