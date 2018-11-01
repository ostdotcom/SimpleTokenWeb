import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";
import {EntityConfigService} from "../services/entity-config.service";
import {UtilitiesService} from "../services/utilities.service";

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

  //actionType can be save. delete and update
  actionType               : string        = null;
  isActionSuccess          : boolean       = false;
  isActionError            : boolean       = false;
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
               private entityConfig : EntityConfigService,
               private utilities : UtilitiesService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.defaultWebhookObj = this.entityConfig.getEntityConfig('entity_configs.webhooks_config');
    this.http.get( this.dataURL ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          if(res.data) {
            let data = res.data;
            this.webhooks        = this.utilities.deepGet(data, 'webhooks');
            this.webhookConfig   = this.utilities.deepGet(data, 'config');
            this.maxWebhookCount = this.utilities.deepGet(data, 'config.max_webhook_count');
            this.populateDefaultWebhook( this.webhookConfig );
          }
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

  populateDefaultWebhook( config ) {
    if(!config) return;
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
      this.isActionSuccess = false;
      this.isActionProcessing = false;
      this.isActionError = false;
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
        newWebhook = JSON.parse(JSON.stringify(this.defaultWebhookObj));
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
          let data         = res.data,
              savedWebhook = this.utilities.deepGet(data, 'webhook'),
              secretKey    = this.utilities.deepGet(data, 'webhook.decrypted_secret_key');
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
      this.isActionSuccess = true;
      this.isActionProcessing = false;
      this.isActionError = false;
    }
  }

  onSuccess( res ) {
    this.isActionSuccess= true;
    this.onComplete( res );
  }

  onError( error ) {
    this.isActionError = true;
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
    webhook.isSecretKeyRefreshing = true;
    this.http.post(this.dataURL +webhookId+'/reset-secret-key', {} ).subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          let data = res.data,
              secretKey = this.utilities.deepGet(data, 'webhook.decrypted_secret_key');
          this.setSecretKey( webhookId, secretKey);
        } else {
          this.errorResponse = res;
          webhook.error = res;
        }
        webhook.isSecretKeyRefreshing = false;
      },
      error => {
        let err = error.json();
        this.errorResponse = err;
        webhook.error = err;
        webhook.isSecretKeyRefreshing = false;
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
    let hookObj            = this.getWebHookById( webhookId ),
        event_sources      = this.utilities.deepGet(hookObj, 'event_sources_array'),
        event_result_types = this.utilities.deepGet(hookObj, 'event_result_types_array');
    return !(event_sources.length == 0 || event_result_types.length == 0);
  }
}
