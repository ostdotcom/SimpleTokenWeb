import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['../../table-modal-base/base-modal.component.scss', './log-modal.component.scss']
})
export class LogModalComponent implements OnInit {
  @Input('caseId') caseId  : any  = null; ;
  @Input('lastActedByName') lastActedByName : string = null; 
  logUrl: string;

  constructor() { }

  ngOnInit() {
    this.logUrl = 'api/admin/kyc/kyc-action-logs/?id=' + this.caseId;
  }

}
