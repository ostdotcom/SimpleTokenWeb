import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup} from '@angular/forms';
import {OstHttp} from '../ost-http.service';
import { RequestStateHandlerService } from '../request-state-handler.service';
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
  isMailSent;
  hasError;
  errorMsg;



  form: FormGroup;
  data_mismatch = [{key: 'first_name', value: 'First Name' },
                   {key: 'last_name', value: 'Last Name' },
                   {key: 'birthdate', value: 'Birthdate' },
                    {key: 'nationality', value: 'Nationality'},
                    {key: 'document_id_number', value: 'Document ID Number'}];
  document_issue = [ {key: 'document_id_issue', value: 'Document ID issue'},
                     {key: 'selfie_issue', value: 'Selfie Issue'},
                   ];
  data = {'email_temp_vars': {}};
  postUrl =  'api/admin/kyc/email-kyc-issue';

  constructor(private formBuilder: FormBuilder, private http: OstHttp, private stateHandler: RequestStateHandlerService ) {


    console.log(this.userDetails);



  }

  @Output('closeReportIssueEvent') closeReportIssueEvent =  new EventEmitter();

  ngOnInit() {

    if (this.userDetails.residence_proof_file_url) {
      this.document_issue.push( {key: 'residency_proof_issue', value: 'Residency Proof Issue' });
    }
    if (this.userDetails.investor_proof_files_url.length) {
      this.document_issue.push(  {key: 'investor_proof_issue', value: 'Investor Proof Issue'});
    }

    this.form = this.formBuilder.group({
      data_mismatch: this.formBuilder.array(this.data_mismatch.map(x => !1)),
      document_issue: this.formBuilder.array(this.document_issue.map(x => !1)),
      other_issue: '',
      other_issue_expln: '',
    });



    $('#confirmation').off('hidden.bs.modal').on('hidden.bs.modal', () => {
      this.stateHandler.updateRequestStatus(this);
      this.isMailSent = false;
    });

  }

  onReportIssue( reportIssue ) {
    const validate  = this.validateForm();
    if (validate.isValidated) {
      this.createData();
      this.postData();
    }else {
      this.hasError = true;
      this.errorMsg = validate.message;
    }
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
        this.stateHandler.updateRequestStatus(this);
        this.isMailSent = true;
        $('#confirmation').modal('hide');
        this.hideReportIssue();
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
        if (formValues[key] instanceof Array) {
          this.data['email_temp_vars'][key] = this.getArray(key, formValues[key]);
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
      if (  formValues[ele] === true  || (formValues[ele] instanceof Array &&  (formValues[ele]).indexOf(true) > -1)) {
        atleastOneSelected = true;
      }
    }
    if (formValues['other_issue'] && ! formValues['other_issue_expln']) {
       return {isValidated: false, message: 'Please provide explanation for other issue'};
    }
    if (atleastOneSelected) {
      return {isValidated: true, message: ''};
    }
    return {isValidated: false, message: 'Please select atleast one issue'};
  }
}
