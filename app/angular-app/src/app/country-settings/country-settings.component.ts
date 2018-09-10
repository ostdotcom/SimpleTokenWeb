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

  hasError      : boolean = false;
  isProcessing  : boolean = true;
  errorMessage  : string  = null;

  btnText       : string  = "Apply";
  isSubmitting  : boolean = false;

  countrySelector     : string  = '#blacklisted_countries';
  nationalitySelector : string  = '#nationalities';

  errorResponse       : object = null;

  constructor(private http: OstHttp, private stateHandler : RequestStateHandlerService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.http.get('api/admin/client/get-country-setting').subscribe(
      response => {
        let res = response.json();
        if(res && res.success){

          let data                  = res.data || {} ,
              countryList           = data.countires,
              nationalities         = data.nationalities,
              blacklistedCountries  = data.blacklisted_countries,
              resProofNationalities = data.residency_proof_nationalities
          ;
          let countryConfigOptions     = this.getConfigOptions( 'Select a country', countryList, blacklistedCountries ),
              nationalityConfigOptions = this.getConfigOptions( 'Select a nationality', nationalities, resProofNationalities );

          setTimeout(()=>{
            this.initMultiSelect(this.countrySelector, countryConfigOptions );
            this.initMultiSelect(this.nationalitySelector, nationalityConfigOptions );
          },0);
          this.stateHandler.updateRequestStatus(this, false,false,false, res);
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

  getConfigOptions( placeholder, optionList, selectedItems ) {
    let config = {
      valueField: 'value',
      labelField: 'label',
      searchField: ['label'],
      placeholder: placeholder,
      options: this.getOptionsArray(optionList),
      items: selectedItems,
      render: {
        item: function (item, escape) {
          return '<div class="itemDiv">' +
            (item.label ? '<span class="item">' + escape(item.label) + '</span>' : '') +
            '<span class="removeIcon pl-2">x</span>' +
            '</div>';
        }
      }
    };
    return config;
  }

  initMultiSelect( elementSelector, options){
    let $select = $(elementSelector).selectize( options ),
        control = $select[0].selectize;
    this.bindEvents( control );
  }

  bindEvents( controlObj ) {
    $('body').on('click','.removeIcon',function(e){
      let itemValue = $(e.target).prev().text();
      controlObj.removeItem(itemValue, true);
    });
  }

  countrySettingsSubmit( countrySettings ) {
    let  blacklistedCountryList =  $(this.countrySelector).val() ,
         resProofNationalities  = $(this.nationalitySelector).val(),
         data   = {
           'blacklisted_countries'         : blacklistedCountryList,
           'residency_proof_nationalities' : resProofNationalities
         }
    ;
    this.preFormSubmit();
    this.http.post('api/admin/client/update-country-setting', data ).subscribe(
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
        this.onFormSubmitError();
      }
    )
  }

  preFormSubmit() {
    this.btnText = 'Applying...';
    this.isSubmitting = true;
  }

  onFormSubmitSuccess( res ){
    this.onFormSubmitComplete();
    $('#country-settings-success-modal').modal('show');
  }

  onFormSubmitError( res? ){
    this.onFormSubmitComplete();
  }

  onFormSubmitComplete() {
    this.btnText = 'Apply';
    this.isSubmitting = false;
  }

  getOptionsArray( list ) {
    let options = [],
        obj = {};
    for(let i=0;i<list.length;i++){
      obj = {
        "label" : list[i],
        "value" : list[i]
      };
      options.push(obj);
    }
    return options;
  }

  resetForm(){
    let countryControl = $(this.countrySelector)[0].selectize,
        nationalityControl = $(this.nationalitySelector)[0].selectize;
        countryControl.clear();
        nationalityControl.clear();
  }
}
