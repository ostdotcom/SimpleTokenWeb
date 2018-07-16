import { Injectable } from '@angular/core';

@Injectable()
export class KycBannerConfigService {

  constructor() { }

  //The order is important and should not be changed as it is used in determining the error code

  alertKeyMap = {
    "approve_type": {
      "noStatus" : 0,
      "manual" : 1,
      "auto" : 2,
      "path": "client_kyc_pass_setting.approve_type"
    },
    "cynopsis_status": {
      "noStatus" : 0,
      "pending" : 1,
      "approved" : 2,
      "denied" :3,
      "path": "case_detail.cynopsis_status"
    },
    "kyc_status": {
      "noStatus" : 0,
      "pending" : 1,
      "approved" : 2,
      "denied" :3,
      "path": "case_detail.kyc_status"
    },
    "last_qualified_type": {
      "noStatus" : 0,
      "manual" : 1,
      "auto" : 2,
      "path": "case_detail.last_qualified_type"
    },
    "admin_status": {
      "noStatus" : 0,
      "unprocessed" : 1,
      "qualified" : 2,
      "denied" :3,
      "path": "case_detail.admin_status"
    },
    "whitelist_status": {
      "noStatus" : 0,
      "unprocessed" : 1,
      "done" : 2,
      "fail" :3,
      "path": "case_detail.whitelist_status"
    },
    "automation_passed": {
      "noStatus" : 0,
      "unprocessed" : 1,
      "true" : 2,
      "false" : 3,
      "path": "automation_passed"
    }
  }

  /* The error code has the bit values in following order:-
      - approve_type
      - cynopsis_status
      - kyc_status
      - last_qualified_type
      - admin_status
      - whitelist_status
      - automation_passed
  */

  config  = {
    '2_2_0_2_2_0_0' : {
      "alertMessage" : 'The case has been automatically qualified.',
      "status": "success"
    },
    '2_2_0_0_1_0_0' : {
      "alertMessage" : 'Manual review needed.',
      "status": "warning"
    },
    '2_2_0_1_1_0_0' : {
      "alertMessage" : 'The case has been manually qualified.',
      "status": "success"
    },
    '2_1_0_1_1_0_0' : {
      "alertMessage" : 'The case has been manually qualified and is awaiting AML/CTF action.',
      "status": "warning"
    },
    '2_1_0_2_1_0_0' : {
      "alertMessage" : 'The case has been automatically qualified and is awaiting AML/CTF action.',
      "status": "warning"
    },
    '2_3_0_2_3_0_0' : {
      "alertMessage" : 'AML/CTF status denied, this case cannot be reopened.',
      "status": "failed"
    },
    '2_3_0_1_3_0_0' : {
      "alertMessage" : 'AML/CTF status denied, this case cannot be reopened.',
      "status": "failed"
    },
    '2_2_0_2_3_0_0' : {
      "alertMessage" : 'Case manually denied by admin.',
      "status": "failed"
    },
    '2_3_0_0_1_0_0' : {
      "alertMessage" : 'Awaiting automation response.',
      "status": "warning"
    },
    '2_1_0_0_1_0_0' : {
      "alertMessage" : 'Awaiting automation response and AML/CTF action.',
      "status": "warning"
    },
    '2_3_0_0_3_0_0' : {
      "alertMessage" : 'AML/CTF status denied, this case cannot be reopened.',
      "status": "failed"
    },
    '2_2_0_0_2_0_0' : {
      "alertMessage" : 'The case has been manually qualified.',
      "status": "success"
    },
    '1_2_0_0_2_0_0' : {
      "alertMessage" : 'The case has been manually qualified.',
      "status": "success"
    },
    '1_2_0_0_3_0_0' : {
      "alertMessage" : 'The case has been manually denied.',
      "status": "failed"
    },
    '1_1_0_0_2_0_0' : {
      "alertMessage" : 'The case has been manually qualified and is awaiting AML/CTF action.',
      "status": "warning"
    },
    '1_3_0_0_2_0_0' : {
      "alertMessage" : 'AML/CTF status denied, this case cannot be reopened.',
      "status": "failed"
    },
    '1_3_0_0_3_0_0' : {
      "alertMessage" : 'AML/CTF status denied, this case cannot be reopened.',
      "status": "failed"
    },
    '2_2_0_2_2_2_0' : {
      "alertMessage" : 'The case has been automatically qualified. Whitelisting done.',
      "status": "warning"
    },
    '2_2_0_2_2_3_0' : {
      "alertMessage" : 'The case has been automatically qualified. Whitelisting failed.',
      "status": "warning"
    },
    '2_1_0_2_2_2_0' : {
      "alertMessage" : 'The case has been manually qualified. Whitelisting done.',
      "status": "warning"
    },
    '2_1_0_2_2_3_0' : {
      "alertMessage" : 'The case has been manually qualified. Whitelisting failed.',
      "status": "warning"
    }
  }

  statusUIMap = {
    "success": {
      "alertStyleClass": "alert-success",
      "svgClass": "alert-success-svg",
      "svgId":"#kyc-success-icon"
    },

    "failed": {
      "alertStyleClass" : 'alert-danger',
      "svgClass" : 'alert-error-svg',
      "svgId" : '#kyc-error-icon'
    },

    "warning":{
      "alertStyleClass" : 'alert-warning',
      "svgClass" : 'alert-warning-svg',
      "svgId" : '#kyc-warning-icon'
    }
  }

}
