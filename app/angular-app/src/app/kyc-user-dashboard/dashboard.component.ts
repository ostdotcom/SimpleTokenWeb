import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityConfigService } from '../services/entity-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import {OstHttp} from '../services/ost-http.service';
import {TableComponent} from '../table/table.component';
import { AppConfigService } from '../services/app-config.service';
import { PageBaseComponentComponent } from '../page-base-component/page-base-component.component';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../table/table.component.scss' ]
})
export class DashboardComponent extends PageBaseComponentComponent implements OnInit {

  @ViewChild(TableComponent) table;

  constructor(
    private entityConfigService: EntityConfigService ,
    private stateHandler: RequestStateHandlerService,
    private http: OstHttp,
    public appConfigService : AppConfigService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super( activatedRoute , router );
  }

  isProcessing: boolean = false;
  hasError: boolean = false;

  // Default parameters
  admin_status : any ;
  admin_action_types : any;
  cynopsis_status: any;
  whitelist_status: any;
  sort_by : any;
  page_number: number;
  isCSVDownloaded = false;
  securityCheckbox: boolean = false;
  securityEthCheckbox: boolean =false;
  checkboxError = '';
  downloadURL = 'api/admin/kyc/get-kyc-report';
  successMessage;
  errorMessage;
  params;

  // Defaults, filterKeys, sortKeys
  defaultQueryParams: object = {
    'filters[admin_status]': 'all',
    'filters[admin_action_types]': 'all',
    'filters[cynopsis_status]': 'all',
    'filters[whitelist_status]': 'all',
    'sortings[sort_by]': 'desc',
    'page_number': 1
  };
  filterKeys: Array<any> = ['admin_status','admin_action_types','cynopsis_status','whitelist_status'];
  sortKeys: Array<any> = ['sort_by'];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      this.initFilters();
      this.initSort();
      this.initPagination();
      this.setQueryParams({});
      setTimeout(function(){
        $('.selectpicker').selectpicker('render');
      },  0)
    });

    $('#confirmDownload').off('hidden.bs.modal').on('hidden.bs.modal', () => {
      this.stateHandler.updateRequestStatus(this);
      this.checkboxError = '';
      this.isCSVDownloaded = false;
    });
  }

  validateAndDownload(){
    if ( this.securityEthCheckbox && this.securityCheckbox){
      this.downloadCSV();

    }else {
      this.checkboxError = 'Please confirm the above to download the CSV';
    }
  }

  downloadCSV() {
    this.stateHandler.updateRequestStatus(this ,  true );
    this.http.get(this.downloadURL, {params: this.getQueryParams() }  ).subscribe(
      response => {
        let res = response.json();
        if (!res.success) {
          this.stateHandler.updateRequestStatus(this , false , true,  false  , res );
          return;
        }
        this.stateHandler.updateRequestStatus(this);
        this.isCSVDownloaded = true;
        this.successMessage  = res.data.success_message;
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this , false , true,  false  , err );

      })
  }

  checkboxChecked() {
    this.checkboxError = '';
  }




}
