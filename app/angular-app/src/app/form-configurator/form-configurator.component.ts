import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';

@Component({
  selector: 'app-form-configurator',
  templateUrl: './form-configurator.component.html',
  styleUrls: ['./form-configurator.component.scss']
})
export class FormConfiguratorComponent implements OnInit {
  errorResponse = false;

  constructor( private http: OstHttp ) { }

  ngOnInit() {
  }

  importAndPublish( form_configurator ) {
    let params =  form_configurator.value;
    this.errorResponse = null;
    if (form_configurator.valid){
      this.http.get('api/admin/configurator/fetch-published-version' , {params: params }  ).subscribe(
        response => {
          let res = response.json();
          if( res.success ){
            //show success modal
          }else{
            this.errorResponse = res;
          }
        },
        error => {
          let err = error.json();
          this.errorResponse = err;
        }
      )
    }
  }

}
