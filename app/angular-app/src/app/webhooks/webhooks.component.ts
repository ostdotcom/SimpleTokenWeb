import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {EntityConfigService} from "../services/entity-config.service";

declare var $: any;

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.scss']
})
export class WebhooksComponent implements OnInit {

  errorMessage : string  = null;
  isProcessing : boolean = true;
  hasError     : boolean = false;
  errorResponse: boolean = false;

  webhooks                 : Array<object> = [];
  defaultWebhookObj        : object        = {};
  webhookConfig            : object        = null;
  maxWebhookCount          : number        = null;
  confirmationCallBack     : Function      = null;
  actionType               : string        = null;
  isSuccess                : boolean       = false;
  isError                  : boolean       = false;
  isActionProcessing       : boolean       = false;
  confirmationModalSelector: string        = "#confirmation-modal";

  static ACTION_TYPES = {
    "SAVE"   : "save",
    "UPDATE" : "update",
    "DELETE" : "delete"
  };

  dataURL : string = "api/admin/webhook/";

  constructor( private http: OstHttp,
               private stateHandler: RequestStateHandlerService,
               private entityConfig : EntityConfigService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.defaultWebhookObj = this.entityConfig.getEntityConfig('entity_configs.webhooks_config');
    this.http.get( this.dataURL ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.webhooks        = res.data.webhooks;
          this.webhookConfig   = res.data.config;
          this.maxWebhookCount = res.data.config.max_webhook_count;
          this.populateDummyWebhook( this.webhookConfig );
          this.stateHandler.updateRequestStatus(this, false, false);
        } else {
          this.stateHandler.updateRequestStatus(this, false, true, false, res);
        }
        this.bindEvents();
      },
      error => {
        let err = error.json();
        this.stateHandler.updateRequestStatus(this, false, true, false, err);
      })
  }

  populateDummyWebhook( config ) {
    let event_sources    = config.event_sources || [],
        event_result_types = config.event_result_types || [];
    for( let i in event_sources ) {
      this.defaultWebhookObj['event_sources_array'].push(event_sources[i].value);
    }
    for( let i in event_result_types ) {
      this.defaultWebhookObj['event_result_types_array'].push(event_result_types[i].value);
    }
  }

  showTooltip(){
    if( this.webhooks.length >= this.maxWebhookCount ){
      $('.btn-disabled-tooltip').tooltip('enable')
    }else {
      $('.btn-disabled-tooltip').tooltip('disable');
    }
  }

  bindEvents() {
    $("#confirmation-modal").on("hidden.bs.modal", () => {
      this.isSuccess = false;
      this.isActionProcessing = false;
      this.isError = false;
      this.errorResponse       = null;
    });
    setTimeout(() => {
      $('.btn-disabled-tooltip').on('mouseenter' , () => {
        this.showTooltip();
      })
    },0);
  }

  addWebHook() {
    let length     = this.webhooks.length,
        newId      = length + 1,
        newWebhook = $.extend( true, {}, this.defaultWebhookObj );
    if(length < this.maxWebhookCount) {
      newWebhook['id'] = newId.toString();
      this.webhooks.unshift(newWebhook);
    }
  }

  saveOrUpdateHook( webhookId, isNew, form){
    let params = form.value,
        url,
        webhook = this.getWebHookById( webhookId );
    if( isNew ) {
      url = this.dataURL ;
    } else {
      url = this.dataURL + webhookId;
    }
    params.event_sources = webhook.event_sources_array;
    params.event_result_types = webhook.event_result_types_array;
    webhook.error = null;
    this.isActionProcessing = true;
    this.http.post( url , { ...params }  ).subscribe(
      response => {
        this.isActionProcessing = false;
        let res = response.json();
        if( res.success ){
          let savedWebhook = res.data.webhook,
              secretKey = savedWebhook.decrypted_secret_key;
          webhook.isNew = false;
          webhook.id    = savedWebhook.id;
          this.setSecretKey( webhook.id, secretKey);
          this.onSuccess( res );
        }else{
          this.errorResponse = res;
          webhook.error = res;
          this.onError( res );
        }
      },
      error => {
        this.isActionProcessing = false;
        let err = error.json();
        this.errorResponse = err;
        webhook.error = err;
        this.onError( err );
      }
    )
  }

  deleteHook( webhookId, isNew ) {
    let webhook = this.getWebHookById( webhookId ),
        i = this.webhooks.length;
    while(i--){
      if( this.webhooks[i]
        && this.webhooks[i].hasOwnProperty('id')
        && (this.webhooks[i]['id'] === webhookId ) ){
        this.webhooks.splice(i,1);
      }
    }
    webhook.error = null;
    this.isActionProcessing = true;
    if( !isNew ) {
      this.http.post( this.dataURL + webhookId +'/delete' , { }  ).subscribe(
        response => {
          this.isActionProcessing = false;
          let res = response.json();
          if( res.success ){
            this.onSuccess( res );
          }else{
            this.errorResponse = res;
            webhook.error = res;
            this.onError( res );
          }
        },
        error => {
          this.isActionProcessing = false;
          let err = error.json();
          this.errorResponse = err;
          webhook.error = err;
          this.onError( err );
        }
      )
    } else {
      this.isSuccess = true;
      this.isActionProcessing = false;
      this.isError = false;
    }
  }

  onSuccess( res ) {
    this.isSuccess= true;
    this.onComplete( res );
  }

  onError( error ) {
    this.isError = true;
    this.onComplete( error );
  }

  onComplete( res ) {

  }

  getBtnText( isNew ) {
    return isNew ? "Save" : "Update";
  }

  showDeleteModal( id, isNew) {
    $(this.confirmationModalSelector).modal('show');
    this.confirmationCallBack = this.deleteHook.bind( this, id, isNew );
    this.actionType = WebhooksComponent.ACTION_TYPES.DELETE;
  }

  showSaveOrUpdateModal(  webhookId , isNew, form) {
    $(this.confirmationModalSelector).modal('show');
    this.confirmationCallBack = this.saveOrUpdateHook.bind(this, webhookId, isNew, form);
    if( isNew ) {
      this.actionType = WebhooksComponent.ACTION_TYPES.SAVE;
    } else {
      this.actionType = WebhooksComponent.ACTION_TYPES.UPDATE;
    }
  }

  refreshSecretKey( id, isNew ) {
    if( isNew) return;
    let webhookId = id,
        webhook = this.getWebHookById( webhookId );
    webhook.error = null;
    this.http.post(this.dataURL +webhookId+'/reset-secret-key', {} ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          let secretKey = res.data.webhook.decrypted_secret_key;
          this.setSecretKey( webhookId, secretKey);
        } else {
          this.errorResponse = res;
          webhook.error = res;
        }
      },
      error => {
        let err = error.json();
        this.errorResponse = err;
        webhook.error = err;
      })
  }

  setSecretKey( webhookId, key ) {
    let secretKey = key,
        webhook   = this.getWebHookById( webhookId );
    if( webhook ) {
      webhook.decrypted_secret_key = secretKey;
    }
  }

  getWebHookById( webhookId ) {
    let webhook;
    for(let i in this.webhooks ) {
      webhook = this.webhooks[i];
      if( webhook.id == webhookId) {
        return webhook;
      }
    }
    return false;
  }

  isChecked( model, value){
    if( model.indexOf(value) > -1 ){
      return true;
    }else{
      return false;
    }
  }

  onChange( model, value){
    let indexOf =  model.indexOf(value);
    if( indexOf > -1 ){
      model.splice( indexOf ,  1);
    }else{
      model.push( value );
    }
  }

  isValid( webhookId ) {
    let hookObj = this.getWebHookById( webhookId );
    return !(hookObj.event_sources_array.length == 0 || hookObj.event_result_types_array.length == 0);
  }
}
