import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup} from '@angular/forms';
import {OstHttp} from '../ost-http.service';


@Component({
  selector: 'report-issues',
  templateUrl: './report-issues.component.html',
  styleUrls: ['./report-issues.component.scss']
})
export class ReportIssuesComponent implements OnInit {

  @Input() caseId: number;
  isProcessing = false;
  beforeSend = true;


  form: FormGroup;
  data_mismatch = [{key: 'first_name', value: 'First Name' },
                   {key: 'last_name', value: 'Last Name' },
                   {key: 'birthdate', value: 'Birthdate' },
                    {key: 'nationality', value: 'Nationality'},
                    {key: 'document_id_number', value: 'Document ID Number'}];
  document_issue = [ {key: 'document_id_issue', value: 'Document ID issue'},
                     {key: 'selfie_issue', value: 'Selfie Issue'},
                     {key: 'residency_proof_issue', value: 'Residency Proof Issue' },
                     {key: 'investor_proof_issue', value: 'Investor Proof Issue'} ];
  data = {};
  postUrl =  'api/admin/kyc/email-kyc-issue';

  constructor(private formBuilder: FormBuilder, private http: OstHttp) {
    this.form = this.formBuilder.group({
      data_mismatch: this.formBuilder.array(this.data_mismatch.map(x => !1)),
      document_issue: this.formBuilder.array(this.document_issue.map(x => !1)),
      other_issue: '',
      other_issue_expln: '',
    });
  }

  @Output('closeReportIssueEvent') closeReportIssueEvent =  new EventEmitter();

  ngOnInit() {

    setTimeout(function(){
      this.isProcessing = false;
      this.beforeSend = true;
    }, 10000);
  }

  onReportIssue( reportIssue ) {
    const validate  = this.validateForm();
    if (validate.isValidated) {
      this.createData();
      this.postData();
    }
  }

  hideReportIssue() {
    this.closeReportIssueEvent.emit('reportIssueClose');
  }

  postData(){
    this.data['id'] = this.caseId;
    this.http.post(this.postUrl, this.data).subscribe(
      response => {
        let res = response.json();
      },
      error => {
        let err = error.json();
      })

  }

  createData() {
    let formValues = this.form.value;
    console.log(formValues);
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        if (formValues[key] instanceof Array) {
          this.data[key] = this.getArray(key, formValues[key]);
        } else if (key === 'other_issue') {
          this.data['other_issue'] = formValues['other_issue_expln'];
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
      if (  formValues[ele] === true  ||  (formValues[ele]).indexOf(true) > -1) {
        atleastOneSelected = true;
      }
    }
    if (formValues['other_issue'] && ! formValues['other_issue_expln']) {
       return {isValidated: false, message: 'Please provide explanation for other issue'};
    }
    if (atleastOneSelected) {
      return {isValidated: true};
    }
    return {isValidated: false, message: 'Please select atleast one issue'};
  }
}
