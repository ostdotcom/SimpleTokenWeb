import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { OstHttp } from '../services/ost-http.service';
import { TableComponent } from '../table/table.component';
import { AppConfigService } from '../services/app-config.service';
import { PageBaseComponent } from '../page-base-component/page-base-component.component';
import { URLSearchParams } from '@angular/http';
import {RequestParamEncoderService} from "../services/request-param-encoder.service";

declare var $: any;


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent extends PageBaseComponent implements OnInit {

  @ViewChild(TableComponent) tableComponent;

  q: string;
  placeholder: string = 'Search By Email';
  user;

  filterKeys: Array<any> = [ 'is_kyc_submitted'];
  sortKeys: Array<any> = ['order'];

  page_number: number;
  postApi: string;
  actionBtnPrimaryName: string;
  actionButtonClass: string;
  message: string;
  successMessage: string;
  DataType: string;
  is_kyc_submitted: string;
  whitelist_status: string;
  order: string;
  caseId: string;

  isCSVDownloaded = false;
  securityCheckbox: boolean = false;
  isProcessing: boolean = false;
  hasError: boolean = false;
  checkboxError = '';
  downloadURL = 'api/admin/kyc/get-user-report';
  modalSuccessMessage;
  errorMessage;


  constructor(
    private zone:NgZone,
    private stateHandler: RequestStateHandlerService,
    private http: OstHttp,
    private requestParamEncoder : RequestParamEncoderService,
    public appConfigService: AppConfigService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super( activatedRoute , router);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams:any) => {
      this.initFilters();
      this.initSort();
      this.initSearch();
      this.initPagination();
      this.setQueryParams({});
      setTimeout(function(){
        $('.selectpicker').selectpicker('render');
      },  0)
    });

    $('#confirmDownload').off('hidden.bs.modal').on('hidden.bs.modal', () => {
      this.zone.run(() => {
        this.resetDownLoadCsvModal();
      });
    });
  }

  onDeleteRow( user ){
    this.user = user;
    let performAction = this.user && this.user.action_to_perform || [];

    if (performAction.includes('reopen')){
      $('#reopenCaseModal').modal('show');

    }else if(performAction.includes('delete')){
      $('#deleteUserModal').modal('show');
    }
  }

  onUpdateEthAddress( user ){
    this.user =  user ;
    let performAction = this.user && this.user.action_to_perform || [];

    if (performAction.includes('reopen')){
      $('#reopenCaseModal').modal('show');

    }else if(performAction.includes('update_ethereum_address')){
      $('#updateEthAddressModal').modal('show');
    }
  }

  onDeleteRowSucces(e){
    this.refreshTableData();
  }

  onReopenSuccess(e){
    this.refreshTableData();
  }

  refreshTableData() {
    if( this.q ){
      this.q = ""; //Reset the search , the table component will by default get all table data
    }else{
      this.tableComponent.getTableData();
    }
  }

  resetDownLoadCsvModal(){
    this.stateHandler.updateRequestStatus(this);
    this.checkboxError = '';
    this.isCSVDownloaded = false;
    this.securityCheckbox = false;
  }

  validateAndDownload(){
    if (this.securityCheckbox){
      this.downloadCSV();
    }else {
      this.checkboxError = 'Please confirm the above to download the CSV';
    }
  }

  downloadCSV() {
    this.stateHandler.updateRequestStatus(this ,  true );
    this.http.post(this.downloadURL, null,{params: this.getParams() }  ).subscribe(
      response => {
        let res = response.json();
        if (!res.success) {
          this.stateHandler.updateRequestStatus(this , false , true,  false  , res );
          return;
        }
        this.stateHandler.updateRequestStatus(this);
        this.isCSVDownloaded = true;
        this.modalSuccessMessage  = res.data.success_message;
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this , false , true,  false  , err );

      })
  }

  checkboxChecked() {
    this.checkboxError = '';
  }

  getParams() {
    let requestParams = this.getQueryParams();
      return this.requestParamEncoder.getEncodedPOSTParams( requestParams );
  }

}
