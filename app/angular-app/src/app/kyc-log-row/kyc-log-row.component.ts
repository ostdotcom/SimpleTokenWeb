import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kyc-log-row',
  templateUrl: './kyc-log-row.component.html',
  styleUrls: ['./kyc-log-row.component.scss']
})
export class KycLogRowComponent implements OnInit {
  @Input() row;
  actionData;
  messageHash = {
    'register': 'User Registered',
    'double_opt_in': 'User did Double Opt-in',
    'update_kyc': 'Updated KYC',
    'kyc_denied': 'KYC Denied',
    'kyc_qualified': 'KYC Approved',
    'cynopsis_api_error': 'Cynopsis Api Error',
    'update_ethereum_address': 'Ethereum Address Updated',
    'open_case': 'Case is Opened Again',
    'phase_changed_to_early_access': 'Phase Changed to Early Access',
    'kyc_issue_email_sent': '',
    'kyc_whitelist_attention_needed': 'kyc whitelist attention needed',
    'kyc_whitelist_processor_error': 'kyc whitelist processor error',
    };

  constructor() {

  }

  ngOnInit() {
    const actionData = this.row.action_data;
    const humanizedActionData = this.row.humanized_action_data;
    if (this.row.action === 'kyc_issue_email_sent') {
      for (let key in humanizedActionData) {
        if ( key.toLowerCase() !== 'other issue') {
           this.actionData = '<b>' + key + '</b>: ';
           this.actionData += humanizedActionData[key];
        }else {
           this.actionData += '<br><b>' + key + '</b>';
        }
     }
     this.row.action = this.actionData;

    } else {
      this.row.action = this.messageHash[this.row.action];
    }
  }

}
