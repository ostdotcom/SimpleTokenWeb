import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import {OstHttp} from '../services/ost-http.service';

@Component({
  selector: 'app-form-configurator',
  templateUrl: './form-configurator.component.html',
  styleUrls: ['./form-configurator.component.scss']
})
export class FormConfiguratorComponent implements OnInit {
  errorResponse;
  showButton = false;

  constructor(public appConfig : AppConfigService,
              private http: OstHttp) { }

  ngOnInit() {
  }

  importAndPublish( form_configurator ) {
    let params =  form_configurator.value;
    this.errorResponse = null;
    if (form_configurator.valid){
      this.http.post('api/admin/configurator/' , {...params }  ).subscribe(
        response => {
          let res = response.json();
          if( res.success ){
            console.log("success---"+res);
          }else{
            this.errorResponse = res;
          }
        },
        error => {
          let err = error.json();
          console.log("err---"+err);
          this.errorResponse = err;
        }
      )
    }
  }

  goToPublishedVersion() {
    this.http.get('api/admin/configurator/fetch-published-version').subscribe(
      response => {
        let res = response.json();
        if(res.success){
          console.log("success---"+res);
          this.showButton = true;
        }
      },
      error => {
        let err = error.json();
        console.log("err---"+err);
      })
  }

}
