import { Component, OnInit } from '@angular/core';
import {OstHttp} from "../services/ost-http.service";
import {RequestStateHandlerService} from "../services/request-state-handler.service";

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
  dummyWebhook             : object        = {'id':'', 'url':'','decrypted_secret_key':'','event_sources_array': [], 'event_result_types_array' : [], 'isNew' : true, 'error': null};
  config                   : object        = null;
  maxWebhookCount          : number        = null;
  btnText                  : string        = "Update";
  confirmationCallBack     : Function      = null;
  action                   : string        = null;
  processingCompleted      : boolean       = false;
  confirmationModalSelector: string        = "#confirmation-modal";

  constructor( private http: OstHttp,
               private stateHandler: RequestStateHandlerService ) { }

  ngOnInit() {
    this.init();
    this.bindEvents();
  }

  init() {
    this.http.get('api/admin/webhook/').subscribe(
      response => {
        let res = response.json();
        if (res.success) {
          this.webhooks        = res.data.webhooks;
          this.config          = res.data.config;
          this.maxWebhookCount = res.data.config.max_webhook_count;
          this.populateDummyWebhook( this.config );
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

  populateDummyWebhook( config ) {
    let event_sources    = config.event_sources || [],
        event_result_types = config.event_result_types || [];
    for( let i in event_sources ) {
      this.dummyWebhook['event_sources_array'].push(event_sources[i].value);
    }
    for( let i in event_result_types ) {
      this.dummyWebhook['event_result_types_array'].push(event_result_types[i].value);
    }
  }

  bindEvents() {
    $("#confirmation-modal").on("hidden.bs.modal", () => {
      this.processingCompleted = false;
      this.errorResponse       = false;
    });
  }

  addWebHook() {
    let length     = this.webhooks.length,
        newId      = length + 1,
        newWebhook = $.extend( true, {}, this.dummyWebhook );
    if(length < 3) {
      newWebhook['id'] = newId.toString();
      this.webhooks.unshift(newWebhook);
    }
    console.log( this.webhooks );
  }

  saveOrUpdateHook( webhookId, isNew, form){
    let params = form.value,
        url,
        webhook = this.getWebHookById( webhookId );
    if( isNew ) {
      url = 'api/admin/webhook/';
    } else {
      url = 'api/admin/webhook/' + webhookId;
    }
    params.event_sources = webhook.event_sources_array;
    params.event_result_types = webhook.event_result_types_array;
    this.http.post( url , { ...params }  ).subscribe(
      response => {
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
    if( !isNew ) {
      this.http.post( 'api/admin/webhook/'+ webhookId +'/delete' , { }  ).subscribe(
        response => {
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
          let err = error.json();
          this.errorResponse = err;
          webhook.error = err;
          this.onError( err );
        }
      )
    } else {
      this.processingCompleted = true;
    }
  }

  onSuccess( res ) {
    this.processingCompleted = true;
    this.onComplete( res );
  }

  onError( error ) {
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
    this.action = "delete";
  }

  showSaveOrUpdateModal(  webhookId , isNew, form) {
    $(this.confirmationModalSelector).modal('show');
    this.confirmationCallBack = this.saveOrUpdateHook.bind(this, webhookId, isNew, form);
    if( isNew ) {
      this.action = "save";
    } else {
      this.action = "update";
    }
  }

  refreshSecretKey( id, isNew ) {
    if( isNew) return;
    let webhookId = id,
        webhook = this.getWebHookById( webhookId );
    this.http.post('api/admin/webhook/'+webhookId+'/reset-secret-key', {} ).subscribe(
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

  isChecked( model, value, id ){
    console.log('id'+ id);
    if( model.indexOf(value) > -1 ){
      return true;
    }else{
      return false;
    }
  }

  onChange( model, value, id ){
    console.log('id'+ id);
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
