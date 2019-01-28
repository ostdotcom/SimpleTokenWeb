import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {UtilitiesService} from "../services/utilities.service";

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit {

  hasError     : boolean = false;
  isProcessing : boolean = false;
  errorMessage : string;

  btnText       : string  = "Apply";
  isSubmitting  : boolean = false;
  errorResponse;

  postData : Object = {};
  sectionList: Array<Object> = [];
  adminList : Object = {};

  dataURL : string = "api/admin/email-notification/";
  postURL : string = "api/admin/";

  constructor(private http: OstHttp,
              private stateHandler: RequestStateHandlerService,
              private utilities : UtilitiesService) { }

  ngOnInit() {
    //this.init();
    let data = {
      'sections': [{
        'display_text': 'section 1',
        'checked': [1,3],
        'disabled': [1],
        'order': [3,2,1,4,5,6],
        'data_key_name': 'section 1'
      }, {
        'display_text': 'section 2',
        'checked': [1,3],
        'disabled': [1],
        'order': [3,2,1,4,5,6],
        'data_key_name': 'section 2'
      }, {
        'display_text': 'section 3',
        'checked': [1,3],
        'disabled': [1],
        'order': [3,2,1,4,5,6],
        'data_key_name': 'section 3'
      }],
      'admins' : {
        '1' : {
          'name': 'admin1',
          'emailId':'admin1@ost.com',
          'role':''
        },
        '2' : {
          'name': 'admin2',
          'emailId':'admin2@ost.com',
          'role':''
        },
        '3' : {
          'name': 'admin3',
          'emailId':'admin3@ost.com',
          'role':''
        },
        '4' : {
          'name': 'admin4',
          'emailId':'admin4@ost.com',
          'role':''
        },
        '5' : {
          'name': 'admin5',
          'emailId':'admin5@ost.com',
          'role':''
        },
        '6' : {
          'name': 'admin6',
          'emailId':'admin6@ost.com',
          'role':''
        }
      }
    };

    this.sectionList = data && data['sections'];
    this.adminList  = data && data['admins'];

  }


  init() {
    this.http.get( this.dataURL ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.sectionList = this.utilities.deepGet(res, 'data.sections');
          this.adminList = this.utilities.deepGet(res, 'data.admins');
          this.stateHandler.updateRequestStatus(this, false, false);
        } else {
          this.stateHandler.updateRequestStatus(this, false, true, false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false, true, false, err);
      })
  }

  submitForm(){
    console.log("posting data....."+ this.postData);
    this.http.post( this.postURL , this.postData ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.onFormSubmitSuccess( res );
        } else {
          this.errorResponse = res;
          this.onFormSubmitError( res );
        }
      },
      error => {
        let err = error.json();
        this.errorResponse = err;
        this.onFormSubmitError( err );
      }
    )
  }

  preFormSubmit() {
    this.btnText = 'Applying...';
    this.isSubmitting = true;
  }

  onFormSubmitSuccess( res ){
    this.onFormSubmitComplete();
  }

  onFormSubmitError( err ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete() {
    this.btnText = 'Apply';
    this.isSubmitting = false;
  }



}
