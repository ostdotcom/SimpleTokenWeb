import { Component, OnInit } from '@angular/core';
import {OstHttp} from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';

declare var $:any;

@Component({
  selector: 'app-country-settings',
  templateUrl: './country-settings.component.html',
  styleUrls: ['./country-settings.component.scss']
})
export class CountrySettingsComponent implements OnInit {
  errorResponse = null;
  hasError: boolean =false;
  isProcessing: boolean =false;
  errorMessage: string;
  countryList = [];
  nationalityList = [];
  blacklistedCountryList = [];
  selectedNationalityList = [];
  btnText = "Apply";
  countrySelector = '#blacklisted_countries';
  nationalitySelector = '#nationalities';
  constructor(private http: OstHttp,

              private stateHandler : RequestStateHandlerService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.isProcessing = true;
    this.http.get('api/admin/client/get-country-setting').subscribe(
      response => {
        let res = response.json(),
            options;
        if(res.success){
          this.countryList = res.data.countires;
          this.nationalityList = res.data.nationalities;
          this.blacklistedCountryList = res.data.blacklisted_countries;
          this.selectedNationalityList = res.data.residency_proof_nationalities;
          this.initMultiSelect(this.countrySelector, {
            valueField: 'value',
            labelField: 'label',
            searchField: ['label'],
            options: this.getOptionsArray(this.countryList),
            items: this.blacklistedCountryList,
            render: {
              item: function (item, escape) {
                return '<div class="itemDiv">' +
                  (item.label ? '<span class="item">' + escape(item.label) + '</span>' : '') +
                  '<span class="removeIcon pl-2">x</span>' +
                  '</div>';
              }
            }
          }, this.blacklistedCountryList);
          this.initMultiSelect(this.nationalitySelector, {
            valueField: 'value',
            labelField: 'label',
            searchField: ['label'],
            options: this.getOptionsArray(this.nationalityList),
            items: this.selectedNationalityList,
            render: {
              item: function (item, escape) {
                return '<div class="itemDiv">' +
                  (item.label ? '<span class="item">' + escape(item.label) + '</span>' : '') +
                  '<span class="removeIcon pl-2">x</span>' +
                  '</div>';
              }
            }
          }, this.selectedNationalityList);
          this.stateHandler.updateRequestStatus(this, false,false);
        }
        else{
          this.stateHandler.updateRequestStatus(this, false,true,false, res);
        }
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false,true, false, err);
      })
  }

  initMultiSelect( elementSelector, options, list){
    let $select = $(elementSelector).selectize( options ),
        control = $select[0].selectize;
    $(document).on('click','.removeIcon',function(e){
      e.preventDefault();
      e.stopPropagation();
      let itemValue = $(e.target).prev().text();
      control.removeItem(itemValue, true);
      let index = list.indexOf(itemValue);
      index > -1 ? list.splice(index): '';
    })
    control.on('item_add', function(value, $item) {
      list.push(value);
    });
  }

  countrySettingsSubmit( countrySettings ) {
    let params = countrySettings.value;
      this.btnText = 'Applying...';
      this.http.post('api/admin/client/update-country-setting', {...params}).subscribe(
        response => {
          let res = response.json();
          if (res.success) {
            this.onFormSubmitSuccess();
          } else {
            this.errorResponse = res;
            this.btnText = 'Apply';
          }
        },
        error => {
          let err = error.json();
          this.errorResponse = err;
          this.btnText = 'Apply';
        }
      )
  }

  onFormSubmitSuccess(){
    this.btnText = 'Apply';
    $('#country-setting-success-modal').modal('show');
  }

  getOptionsArray( list ) {
    let options = [],
        obj = {};
    for(let i=0;i<list.length;i++){
      obj = {
        "label" : list[i],
        "value" : list[i]
      }
      options.push(obj);
    }
    return options;
  }

  updateSelectModel(){

  }

  downloadList(){

  }





}
