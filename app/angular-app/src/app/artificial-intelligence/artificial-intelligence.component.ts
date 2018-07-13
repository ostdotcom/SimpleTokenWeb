import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';
import { OstHttp } from '../services/ost-http.service';
import { RequestStateHandlerService } from '../services/request-state-handler.service';
import { EntityConfigService } from '../services/entity-config.service';

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
               public appConfig : AppConfigService ) { }

  hasError        : boolean = false; 
  isProcessing    : boolean = false; 
  isSuperAdmin    : boolean = false; 
  cachedResponse  : object  = null; 
  ocrOptions      : Array<object>;

  approveType           : string      = "manual";  //Default to be set to manual
  frMmatchPercent       : number      = 100;       //Default to be set as 100% match
  ocrComparisonFields   : Array<any>  = []; 
  params                : object      = {};
  errorResponse         : object      = null; 
  
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
        clientSetting         = data && data.client_kyc_pass_setting
    ; 
    this.cachedResponse       = JSON.parse(JSON.stringify(response));  //Cache response; 
    this.approveType          = data && data.approve_type || this.approveType ; 


    if( clientSetting ){
      this.frMmatchPercent      = clientSetting.fr_match_percent      || this.frMmatchPercent; 
      this.ocrComparisonFields  = clientSetting.ocr_comparison_fields || this.ocrComparisonFields; 
    }
  }

  isChecked( value ){
    if( this.ocrComparisonFields.indexOf(value) > -1 ){
      return true; 
    }else{
      return false; 
    }
  }

  onChange( value ){
    let indexOf =  this.ocrComparisonFields.indexOf(value);
    if( indexOf > -1 ){
      this.ocrComparisonFields.splice( indexOf ,  1); 
    }else{
      this.ocrComparisonFields.push( value );
    }
  }

  isVaild( form ){
    if( !form.valid ){
      return false; 
    }

    if( this.approveType == "auto" ){
      return this.ocrComparisonFields && this.ocrComparisonFields.length > 0 ; 
    }
    
    return true ; 
  }

  onSliderUpdate( value ){
    this.frMmatchPercent = value; 
  }  

  updateSettings( form ){
    let params = form.value
    ;
    params['ocr_comparison_fields'] = this.ocrComparisonFields;  
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

