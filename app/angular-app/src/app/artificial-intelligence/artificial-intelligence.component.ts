import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import { OstHttp } from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { EntityConfigService } from '../services/entity-config.service';
import { ScrollTopService } from '../services/scroll-top.service';

declare var $: any ; 

@Component({
  selector: 'app-artificial-intelligence',
  templateUrl: './artificial-intelligence.component.html',
  styleUrls: ['./artificial-intelligence.component.scss']
})
export class ArtificialIntelligenceComponent implements OnInit {

  constructor( private http: OstHttp ,  
               private stateHandler : RequestStateHandlerService,
               private entityConfigService : EntityConfigService,
               private scrollTopService : ScrollTopService,
               public appConfig : AppConfigService ) { }

  hasError        : boolean = false; 
  isProcessing    : boolean = false; 
  isSuperAdmin    : boolean = false; 
  cachedResponse  : object  = null; 
  ocrOptions      : Array<object>;

  approveStatus                 : string      = "manual";  
  recommendedFRMmatchPercent    : number      = 0; 
  recommendedAutoApproveFields  : Array<any>  = [];
  clientFRMmatchPercent         : number      = 100;  //Default to be set as 100% match
  clientAutoApproveFields       : Array<any>  = []; 
  params                        : object      = {};
  errorResponse                 : object      = null; 
  
  ngOnInit() {
    let ocr     = this.entityConfigService.getEntityConfig('entity_configs.artificial_intelligence_component.ocr'),
        values  = ocr && ocr['values']
    ; 
    this.isSuperAdmin = this.appConfig.isSuperAdmin(); 
    this.ocrOptions   = values || [];
    this.getData()
  }

  getData(){
    this.stateHandler.updateRequestStatus(this , true , false );
    this.http.get('api/admin/client/auto-approve-setting').subscribe(
      response => {
        let res = response.json(); 
        if( res.success ){
          this.updateView( res ); 
          this.stateHandler.updateRequestStatus(this , false , false );
        }else{
          this.stateHandler.updateRequestStatus(this , false , true , false,  res ); 
        }
      },
      error => {
        let err = error.json(); 
        this.stateHandler.updateRequestStatus(this , false , true , false,  err );
      }
    )
  }

  updateView( res ){
    let response              = res,
        data                  = response && response.data,
        recommendedSetting    = data && data.recommended_setting,
        clientSetting         = data && data.client_kyc_auto_approve_setting
    ; 
    this.cachedResponse       = JSON.parse(JSON.stringify(response));  //Cache response; 
    
    this.approveStatus = data && data.approve_status || this.approveStatus ; 

    if( recommendedSetting ){
      this.recommendedFRMmatchPercent   = recommendedSetting.fr_match_percent    || this.recommendedFRMmatchPercent; 
      this.recommendedAutoApproveFields = recommendedSetting.auto_approve_fields || this.recommendedAutoApproveFields; 
    }

    if( clientSetting ){
      this.clientFRMmatchPercent    = clientSetting.fr_match_percent    || this.clientFRMmatchPercent; 
      this.clientAutoApproveFields  = clientSetting.auto_approve_fields || this.clientAutoApproveFields; 
    }
  }

  isChecked( value ){
    if( this.clientAutoApproveFields.indexOf(value) > -1 ){
      return true; 
    }else{
      return false; 
    }
  }

  onChange( value ){
    let indexOf =  this.clientAutoApproveFields.indexOf(value);
    if( indexOf > -1 ){
      this.clientAutoApproveFields.splice( indexOf ,  1); 
    }else{
      this.clientAutoApproveFields.push( value );
    }
  }

  isVaild( form ){
    if( !form.valid ){
      return false; 
    }

    if( this.approveStatus == "auto" ){
      return this.clientAutoApproveFields && this.clientAutoApproveFields.length > 0 ; 
    }
    
    return true ; 
  }

  onSliderUpdate( value ){
    this.clientFRMmatchPercent = value; 
  }  

  updateSettings( form ){
    let params = form.value
    ;
    params['auto_approve_fields'] = this.clientAutoApproveFields;  
    this.params = params;  
    $('#ai-confimation-modal').modal('show'); 
  } 

  onCancel( ){
    this.updateView( this.cachedResponse );
  }

  onUpdateSuccess( res ){
    this.updateView( res ); 
  }

  onUpdateError( res ){
    this.errorResponse = res; 
  }
}

