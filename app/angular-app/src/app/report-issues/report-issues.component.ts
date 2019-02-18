import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup} from '@angular/forms';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { ScrollTopService } from '../services/scroll-top.service';
import { EntityConfigService } from '../services/entity-config.service';

declare var $: any;


@Component({
  selector: 'report-issues',
  templateUrl: './report-issues.component.html',
  styleUrls: ['./report-issues.component.scss']
})
export class ReportIssuesComponent implements OnInit {

  @Input() caseId: number;
  @Input() userDetails;
  isProcessing = false;
  beforeSend = true;
  isMailSent = false;
  hasError;
  errorMessage;
  frontEndError = '';
  otherIssueError;
  otherIssueDisabled : boolean = true;

  form: FormGroup;
  data_mismatch: Array<object>;
  document_issue: Array<object>;
  data = {'email_temp_vars': {}};
  postUrl =  'api/admin/kyc/email-kyc-issue';

  constructor(private formBuilder: FormBuilder,
              private http: OstHttp,
              private stateHandler: RequestStateHandlerService,
              private scrollTopService: ScrollTopService,
              private entityConfigService: EntityConfigService ) {
  }

  @Output('closeReportIssueEvent') closeReportIssueEvent =  new EventEmitter();
  @Output('actionSuccessEvent') actionSuccessEvent =  new EventEmitter();

  ngOnInit() {
    this.scrollTopService.scrollTop();
    this.data_mismatch = this.entityConfigService.getEntityConfig('entity_configs.report_issue.data_mismatch')['values'];
    this.document_issue = [ ...this.entityConfigService.getEntityConfig('entity_configs.report_issue.document_issue')['values']];

    if (this.userDetails.residence_proof_file_url) {
      this.document_issue.push(this.entityConfigService.getEntityConfig('entity_configs.report_issue.residence_proof')['values']);
    }
    if (this.userDetails.investor_proof_files_url && this.userDetails.investor_proof_files_url.length) {
      this.document_issue.push(this.entityConfigService.getEntityConfig('entity_configs.report_issue.investor_proof')['values']);
    }

    this.form = this.formBuilder.group({
      data_mismatch: this.formBuilder.array(this.data_mismatch.map(x => !1)),
      document_issue: this.formBuilder.array(this.document_issue.map(x => !1)),
      other_issue: '',
      other_issue_expln: '',
    });



    $('#confirmation').off('hidden.bs.modal').on('hidden.bs.modal', () => {
      this.stateHandler.updateRequestStatus(this);
      if(this.isMailSent) {
        this.actionSuccessEvent.emit();
      }
      this.isMailSent = false;
      this.hideReportIssue();
    });

  }

  onReportIssue( reportIssue ) {
    this.createData();
    this.postData();
  }

  hideReportIssue() {
    this.closeReportIssueEvent.emit('reportIssueClose');
  }

  postData(){
    this.stateHandler.updateRequestStatus(this ,  true );
    this.data['id'] = this.caseId;
    this.http.post(this.postUrl, this.data).subscribe(
      response => {
        let res = response.json();
        if (!res.success) {
          this.stateHandler.updateRequestStatus(this , false , true,  false  , res );
          return;
        }
        this.stateHandler.updateRequestStatus(this);
        this.isMailSent = true;
        setTimeout(() => {
          $('#confirmation').modal('hide');
        } , 1000 );
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this , false , true,  false  , err );
      })
  }

  createData() {
    let formValues = this.form.value;
    console.log(formValues);
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        console.log(formValues[key], key);

        if (formValues[key] instanceof Array) {
          this.data['email_temp_vars'][key] = this.getArray(key, formValues[key]);
        } else if (key === 'other_issue') {
            if (formValues['other_issue']) {
              this.data['email_temp_vars']['other_issue'] = formValues['other_issue_expln'];
            } else {
              this.data['email_temp_vars']['other_issue'] = '';
            }
        }
      }
    }
  }

  getArray(key, value) {
    let arr = [];
    if (!(value instanceof Array)) {
      return;
    }
    value.forEach((element, id) => {
      if (element) {
        arr.push(this[key][id].key);
      }
    });
    return arr;
  }

  validateForm() {
    let formValues = this.form.value,
    atleastOneSelected = false;
    for (let ele in formValues ) {
      if (  formValues[ele] === true  || (formValues[ele] instanceof Array &&  (formValues[ele]).indexOf(true) > -1)) {
        atleastOneSelected = true;
      }
    }
    if (formValues['other_issue'] && ! formValues['other_issue_expln']) {
       this.otherIssueError = 'Please provide explanation for other issue';
       this.frontEndError = '';
       return {isValidated: false};
    }
    if (atleastOneSelected) {
      return {isValidated: true};
    }
    this.otherIssueError = '';
    this.frontEndError = 'Please select atleast one issue';
    return {isValidated: false };
  }

  validateAndOpenModal() {
    const validation = this.validateForm();

    if (validation.isValidated) {
      this.otherIssueError = '';
      this.frontEndError = '';
      $('#confirmation').modal('show');
    }

  }

  otherIssueToggled() {
    this.otherIssueDisabled = this.otherIssueDisabled ? null : true;
  }
}
