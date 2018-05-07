import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['../base-modal/base-modal.component.scss', './log-modal.component.scss']
})
export class LogModalComponent implements OnInit {
  @Input() caseId ;
  logUrl: string;

  constructor() { }

  ngOnInit() {
    this.logUrl = 'api/admin/kyc/kyc-action-logs/?id=' + this.caseId;
  }

}
