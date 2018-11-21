;
(function (window , $ ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      iframe              = ns('ost.ostIframe'),
      uiConfigConstants   = ns('ost.uiConfigConstants'),
      richTextEditor      = ns('ost.richTextEditor'),
      lengthMocker        = ns('ost.lengthMocker'),
      oThis
  ;

  var sectionsAttr          = uiConfigConstants.getSectionsAttr(),
      jAjaxProcessingWrap   = $(".ajax-processing-wrapper"),
      jAjaxErrorWrap        = $(".ajax-error-wrapper"),
      sDeleteWrapper        = ".form-group"
  ;

  // var extra_field_config = {
  //   document_id_instruction_text1 :{
  //     data_key_name : "something",
  //     data_kind : "html",
  //     validations:{
  //       max_length :400,
  //       required :0
  //     }
  //   }
  // }

  oSTNs.configuratorHelper = oThis = {
    jForm       : $('#configurator-form'),
    jFormBtn    : $('#save-and-preview-btn-click'),
    formHelper  : null,

    jFormGeneralError   : $('#configurator-general-error'),
    jFormGeneralErrMsg  : "Please check all sections for errors.",

    initConfig  : {
      iframeUrl       : null
    }  ,

    configuratorData      : {}  ,
    configurationChanged  : false ,

    /*
    * Init configurator on the basic of config passed
    * params : config , callback
    *     config : {
    *       configuratorGetApi :  "get api",
    *       publishApi: "publish api",
    *       resetApi : "reset api,
    *       iframeUrl : "iframe loadable url"
    *     }
    * returns : undefined
    */

    init : function ( config ,  callback ) {
      oThis.initConfig = config ; //Should be very first step.

      var ajaxConfig = oThis.getConfiguratorAjaxConfig( callback ) ;
      if( !ajaxConfig ) return ;
      $.ajax( ajaxConfig ) ;
      oThis.initFormHelper();
      oThis.initValidatorIgnoreRules();
    },

    /*
    * Get configurator data
    * params :  callback
    * returns : ajaxConfig
    */

    getConfiguratorAjaxConfig : function ( callback ) {
      var api    = oThis.getConfiguratorApi() ,
          method = oThis.getConfiguratorMethod(),
          params = oThis.getConfiguratorParams(),
          ajaxConfig
      ;
      if( !api ) return false;
      ajaxConfig = {
        url     : api ,
        method  : method,
        beforeSend : function () {
          jAjaxProcessingWrap.show(); 
        },
        success: function( res  ) {
         // $.extend(res.data.entity_config,extra_field_config);
          oThis.onConfiguratorGetSuccess( res , callback );
        },
        error : function ( jqXhr , error ) {
          oThis.onConfiguratorError.apply(oThis, arguments );

        },
        complete: function ( res ) {
          oThis.onConfiguratorComplete.apply(oThis, arguments ) ;
        }
      } ;
      if( params ){
        ajaxConfig['data'] = params ;
      }
      return ajaxConfig ;
    },

    /*
    * Callback on configurator get success
    * params :  result , callback
    *     callback : passed from Parent page
    * returns : undefined
    */

    onConfiguratorGetSuccess : function ( result , callback ) {
      if( result.success ){
        var data = result.data || {} ;
        oThis.configuratorData = data ;
        formBuilder.init( data );
        oThis.checkForAccordions();
        oThis.initCommonSettings();
        lengthMocker.setInitialLengths();
        oThis.bindEvents();
        if( callback ){
          callback( data );
        }
      }else{
        oThis.showConfiguratorErrorOverlay( result );
      }
    },

    /*
     * Callback on configurator get error
     * params :  jqXhr , error
     * returns : undefined
     */

    onConfiguratorError : function (  jqXhr , error  ) {
      oThis.showConfiguratorErrorOverlay( error );
    },


    /*
     * Callback on configurator get complete
     * params :  res
     * returns : undefined
     */

    onConfiguratorComplete : function ( res ) {
      jAjaxProcessingWrap.hide();
    },

    /*
     * Show complete page error overlay on get fail.
     * params :  response
     * returns : undefined
     */

    showConfiguratorErrorOverlay : function ( response ) {
      var err     = response && response.err,
        errMsg  = err && err.display_text
      ;
      if( errMsg ){
        jAjaxErrorWrap.find('.error-message').html( errMsg );
      }
      jAjaxErrorWrap.show();
    },

    /*
     * Init common setting like can publish and reset.
     * Reload iframe with update url
     * params :  data
     * returns : undefined
     */

    initCommonSettings : function ( ) {
      var data       = oThis.configuratorData ,
          rules      = data && data['rules'] ,
          canReset   = rules["can_reset"]  ,
          canPublish = rules["can_publish"]
      ;
      if( canReset ) {
        $('#reset-configurator-changes').show();
      }
      if( canPublish ){
        $('#publish-configurator-changes').show();
      }
      iframe.loadUrlInIframe( oThis.initConfig.iframeUrl );
    },

    checkForAccordions : function () {
      var sSections     = "[" + sectionsAttr + "]" ,
          sHideSection  = ".accordion" ,
          jSections     = $( sSections ),
          len           = jSections.length, cnt,
          jSection , jEntity , jHideSection
      ;
      if (!len) return;
      for (cnt = 0; cnt < len; cnt++) {
        jSection = jSections.eq(cnt);
        jEntity  = jSection.find( sDeleteWrapper );
        if( !jEntity || jEntity.length == 0 ) {
          jHideSection = jSection.closest( sHideSection );
          jHideSection.hide();
        }
      }
    },

    /*
     * Returns configurator ajax Api
     * params :  config
     * returns : api
     */

    getConfiguratorApi : function ( config ) {
      return oThis.initConfig && oThis.initConfig.configuratorGetApi ;
    },

    /*
     * Returns configurator ajax method
     * params :  config
     * returns : method
     */

    getConfiguratorMethod : function( config ){
      return oThis.initConfig && oThis.initConfig.configuratorMethod ||"GET" ;
    },

    /*
     * Returns configurator ajax params
     * params :  config
     * returns : params
     */

    getConfiguratorParams : function ( config ) {
      return oThis.initConfig && oThis.initConfig.configuratorParams;
    },

    /*
     * Returns configurator publish ajax api
     * params :  null
     * returns : params
     */

    getPublishApi : function () {
      return oThis.initConfig && oThis.initConfig.publishApi ;
    },

    /*
     * Returns configurator reset ajax api
     * params :  null
     * returns : params
     */

    getResetApi : function () {
      return oThis.initConfig && oThis.initConfig.resetApi ;
    },

    /*
     * Called on Done button click
     * params :  null
     * returns : null
     */

    onCmsExitBtnClick : function () {
      $("#exit-cms-modal").modal('show');
    },

    /*
     * Called on configurator exit confirmation
     * params :  null
     * returns : null
     */

    onCmsExitConfirmationBtnClick : function () {
      oThis.setConfiguratorChangedFlag( false );
      window.location.href = "/admin/settings/form-configurator" ;
    },

    setConfiguratorChangedFlag : function ( value ) {
      if(  oThis.configurationChanged == value ) return ;
      if( value != undefined ){
        oThis.jFormBtn.prop('disabled' , !value );
        oThis.configurationChanged = value ;
      }
    },

    getConfiguratorChangedFlag : function (  ) {
      return oThis.configurationChanged  ;
    },

    /*
     * Bind all user action events.
     * params :  null
     * returns : null
     */

    bindEvents : function () {

      oThis.jFormBtn.on('click' , function () {
        oThis.onSaveAndPreviewClick( $(this) );
      });

      oThis.jForm.on('keyup change' , "input , textarea" , function () {
        oThis.setConfiguratorChangedFlag( true );
      });

      oThis.jForm.on('invalid-form' , function () {
        oThis.showFormGeneralError();
      });

      $("#exit-cms-btn").on('click' , function () {
        oThis.onCmsExitBtnClick();
      });

      $("#exit-cms-confirmation-btn").on('click' , function () {
        oThis. onCmsExitConfirmationBtnClick();
      });

      $('#reset-configurator-changes').on('click' , function () {
        oThis.resetChangesClick();
      });

      $('#publish-configurator-changes').on('click' , function () {
        oThis.publishChangesClick();
      });

      $('#reset-changes-btn').on('click' , function () {
        oThis.resetChanges();
      });

      $('#publish-changes-btn').on('click' , function () {
        oThis.publishChanges();
      });

      $(window).bind("beforeunload",function(event) {
        oThis.beforeUnload();
        if( oThis.configurationChanged ) {
          return " There are unsaved changes made to this page."
        }
      });

      $('.cms-modal').on('hidden.bs.modal', function () {
        var jModal          = $(this),
            jStateHandler   = jModal.find('.state-handler'),
            jInitialHandler = jModal.find('.pre-state')
        ;
        jStateHandler.hide();
        jInitialHandler.show();
      });

    },

    /*
     * Resets the nav bar select picker on cancelling window unload
     * params :  null
     * returns : null
     */
    beforeUnload : function() {
      var jSelect = $('#configurator-options');
      var value = jSelect.val();
      setTimeout(function() {
        var href = window.location.href;
        if( href.indexOf(value) == -1) {
          jSelect.val( jSelect.data('selected-value'));
          jSelect.selectpicker('refresh');
        }
      }, 1000);
    },

    /*
     * Init configurator formHelper.
     * params :  null
     * returns : null
     */

    initFormHelper : function () {
      var jEl         = oThis.jFormBtn,
          jModal      = $('#issues-while-submitting'),
          jForm       = oThis.jForm
      ;
      oThis.formHelper  = jForm.formHelper({
        beforeSend : function () {
          var preSubmitText = jEl.text() ,
              submittingText  = jEl.data('submitting')
          ;
          jEl.data("pre-submit-text" , preSubmitText );
          jEl.text( submittingText );
          jEl.prop( "disabled", true );
        },
        success: function ( res ) {
          if( res.success ){
            oThis.onSaveAndPreviewSuccess( res );
          }else{
            oThis.onSaveAndPreviewSuccessFalse(res , jModal );
          }
        },
        error: function ( jqXhr ,  error ) {
          setTimeout( function () {
            oThis.onSaveAndPreviewError( jModal );
          } , 0 );
        },
        complete: function () {
          var preSubmitText   = jEl.data('pre-submit-text');
          jEl.text( preSubmitText );
          jEl.prop( "disabled", false );
        }
      });
    },

    onSaveAndPreviewSuccessFalse: function( res , jModal ){
      var error       = res && res.err ,
          errData     = error && error['error_data'] ,
          isPublished = errData && errData['is_published']
          ;
      if( isPublished == 1 ){
        this.setConfiguratorChangedFlag( false );
        jModal.find('.create-new-draft-btn').show();
      }else {
        oThis.showFormGeneralError();
      }
      oThis.onRequestFailure( jModal , res );
    },

    onSaveAndPreviewError : function ( jModal  ) {
      var jError = oThis.jForm.find('.general_error') ,
          errMsg = jError && jError.text(),
          errorRes  = { err : {} }
      ;
      if( errMsg ) {
        errorRes['err']['display_text'] = errMsg ;
      }
      oThis.onRequestFailure( jModal , errorRes );
    },

    initValidatorIgnoreRules : function () {
      oThis.jForm.validate().settings.ignore = null;
    },

    showFormGeneralError : function () {
      oThis.jFormGeneralError.html(oThis.jFormGeneralErrMsg);
    },

    clearFormGeneralError : function () {
      oThis.jFormGeneralError.html("");
    },

    /*
     * Called on form save.
     * params :  null
     * returns : null
     */

    onSaveAndPreviewClick : function ( jEl ) {
      oThis.clearFormGeneralError();
      oThis.formHelper.jForm.submit();
    },

    /*
     * Reload iframe on save form success.
     * params :  null
     * returns : null
     */

    onSaveAndPreviewSuccess : function ( res ) {
      var data      = res  && res.data ,
          formData  = data && data['form_data']
      ;
      formBuilder.setCompleteFormData( formData );
      oThis.setConfiguratorChangedFlag( false );
      iframe.loadUrlInIframe( oThis.initConfig.iframeUrl );
    },

    /*
     * Reset changes to publish version from draft version.
     * to do later should have individual callbacks
     * params :  null
     * returns : null
     */

    resetChangesClick : function () {
      $('#reset-changes-modal').modal('show');
    },

    resetChanges : function () {
      var api       = oThis.getResetApi() ,
          jModal    = $('#reset-changes-modal')
      ;
      if( !api ) return ;
      $.ajax({
        url: api,
        method: "POST",
        beforeSend : function () {
          oThis.onBeforeChanges( jModal );
        },
        success : function ( res ) {
          oThis.onResetSuccess( res , jModal);
        },
        error: function (jqXhr ,  error ) {
          oThis.onRequestFailure(jModal ,  error );
        }
      });
    },

    onResetSuccess : function (res , jModal) {
      if( res.success ){
        location.reload();
      }else{
        oThis.onRequestFailure( jModal , res );
      }
    },

    /*
     * Publish saved draft version for the page on production.
     * to do if required should have individual callbacks
     * params :  null
     * returns : null
     */
    publishChangesClick : function () {
      $('#publish-changes-modal').modal('show');
    },

    publishChanges : function (  ) {
      var api     = oThis.getPublishApi() ,
          jModal  = $('#publish-changes-modal')
      ;
      if( !api ) return ;
      $.ajax({
        url: api,
        method: "POST",
        beforeSend : function () {
          oThis.onBeforeChanges( jModal );
        },
        success : function ( res ) {
          oThis.onPublishChangesSuccess( res , jModal );
        },
        error: function (jqXhr ,  error ) {
          oThis.onRequestFailure(jModal ,  error );
        }
      });
    },

    onPublishChangesSuccess : function ( res , jModal) {
      if( res.success ){
        var data      = res && res.data ,
            clientURL = data && data['published_url'] ,
            jClientURL
        ;
        if( clientURL ){
          jClientURL = jModal.find('.client-link') ;
          jClientURL
            .text( clientURL )
            .attr('href', clientURL);
        }
        jModal.find('.state-handler').hide();
        jModal.find('.success-state').show();
        $('#publish-configurator-changes').hide();
      }else{
        oThis.onRequestFailure(jModal , res );
      }
    },

    onBeforeChanges : function ( jModal ) {
      jModal.find('.state-handler').hide();
      jModal.find('.processing-state').show();
    },

    /*
     * Called on all ajax failure like save , publish and reset .
     * to do if required should have individual callbacks
     * params :  jModal , res
     * returns : null
     */

    onRequestFailure : function ( jModal ,  res ) {
      var error   = res && res.err ,
          errMsg  = error && error['display_text']
      ;
      if( errMsg ){
        jModal.find('.error-message').html( errMsg );
      }
      jModal.find('.state-handler').hide();
      jModal.find('.error-state').show();
      jModal.modal('show');
    },

    /*
     * Called on entity delete .
     * params :  jEL , sWrapperToDelete
     * returns : deleted el
     */

    deleteComponent : function( jEL , sWrapperToDelete  ) {
      var sDeleteEl = sWrapperToDelete || sDeleteWrapper,
          jDeleteEl = jEL.closest( sDeleteEl )
      ;
      jDeleteEl.remove();
      oThis.setConfiguratorChangedFlag( true );
      return jDeleteEl;
    },

    /*
     * On accordion click open section and reload iframe with accordion param .
     * params :  sSelector  , sSlider , sParent
     * returns : null
     */

    bindAccordionClick : function ( sSelector  , sSlider , sParent ) {
      var sSelector = sSelector || '.accordion-header' ,
          sSlider   = sSlider   || '.accordion-content-wrapper' ,
          sParent   = sParent   || '.accordion',
          jParent , jEl  , iframeUrl;
        ;
      $( sSelector ).on('click' , function () {
        jEl = $(this) ;
        jParent = jEl.closest( sParent );
        jParent.siblings( sParent ).find(sSlider).slideUp();
        jParent.find(sSlider).slideDown();
        oThis.onAccordionClickIframeLoad( jParent );
      });
    },

    /*
     * On accordion click reload iframe with accordion param .
     * params :  jParent
     * returns : null
     */

    onAccordionClickIframeLoad : function ( jParent ) {
      var  iframeUrl       = oThis.initConfig.iframeUrl ,
           accordionAttr   = uiConfigConstants.getSectionsAttr(),
           jAccordion      = jParent.find( "[" + accordionAttr + "]" ),
           accordionId     = jAccordion.attr( accordionAttr ),
           windowUpdateUrl = oThis.getUpdateUrl( "accd_id" , accordionId )
      ;
      iframeUrl = oThis.getUpdateUrl( "accd_id" , accordionId , iframeUrl );
      window.history.pushState( "" , "" , windowUpdateUrl );
      if( oThis.initConfig.iframeUrl != iframeUrl ){
        oThis.initConfig.iframeUrl = iframeUrl;
        iframe.loadUrlInIframe( iframeUrl );
      }
    } ,

    /*
     * Get ur with passed key value pair, if no key already create one
     * params :  key, value , url
     * returns : update url
     */

    getUpdateUrl : function( key, value , url ) {

      if( !key || !value ){
        return url || window.location.href ;
      }

      key = encodeURI(key); value = encodeURI(value);
      var kvp = document.location.search.substr(1).split('&') ,
          i=kvp.length , x ,
          url = url || window.location.href ,
          newParams , preParamsUrl , finalUrl ,
          splitter = "?"
      ;
      while(i--)
      {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
          x[1] = value;
          kvp[i] = x.join('=');
          break;
        }
      }

      if(i<0) {
        kvp[kvp.length] = [key,value].join('=');
      }

      newParams = kvp.join('&');
      preParamsUrl = url.split(splitter)[0];
      if( newParams ){
        finalUrl = preParamsUrl + splitter + newParams ;
      }else {
        finalUrl = url;
      }
      return finalUrl;
     },

    /*
     * Dragable element binder helper
     * params :  sParentSelector, sChildSelector
     * returns :  null
     */

    bindDraggable : function ( sParentSelector, sChildSelector ) {
      if(!sParentSelector) return;
      var sortableConfig = {
            axis: 'y',
            cursor: 'move',
            start : function( event, ui  ) {
              var item = $(ui.item) ,
                  jEl  = item && item.find('textarea')
              ;
              sElementId = jEl && jEl.attr( 'id' );
            },
            stop : function() {
              tinyMCE.get( sElementId ).destroy() ;
              richTextEditor.initTinyMc( "#"+sElementId  );
            }
          },

        sElementId = null
      ;

      if( sChildSelector) {
        sortableConfig['items'] = sChildSelector ;
      }
      $(sParentSelector).sortable( sortableConfig );
    },

    /*
     * This function is used in common for pages kyc-form and dashboard.
     * If other pages require any variation, then creating a separate page specific function is recommended.
     * params
     *    entityKey   : backend entity key
     *    sWrapper    : after creating markup append to sWrapper
     *    sElementKey : selector
     *    callback    : if needed any hanlding from caller , current jQuerey element passed as argument.
     * returns : undefined
     */
    bindPopUpToggleOption : function ( jElement , entityKey, sWrapper,  callback ) {
      if( !entityKey || !sWrapper || !jElement ) return;
      var jWrapper        = $(sWrapper) ,
          entitySelector  = "."+entityKey ,
          jEntity , jTextArea ,
          entityConfig ,
          jEl , jVal
      ;
       jElement.off('change').on('change' , function () {
        jEntity         = jWrapper.find( entitySelector ),
        jTextArea       = jEntity.find('textarea'),
        jEl = $(this) ;
        jVal = jEl.val();
        if( jVal == 0 ) {
          jEntity.hide();
          jTextArea.prop('disabled' , true);
        }else {
          if( !jEntity || jEntity.length == 0 ) {
            entityConfig = formBuilder.getEntityConfig(entityKey);
            formBuilder.buildEntity( entityConfig, jWrapper );
          }
          jTextArea.prop('disabled' , false);
          jEntity.show();
        }
        if( callback ){
          callback( jEl );
        }
      });
    },

    /*
    * This function is used in common for pages kyc-form and dashboard.
    * If other pages require any variation, then creating a separate page specific function is recommended.
    * params
    *    sWrapper       : backend entity key
    *    sElement       : after creating markup append to sWrapper
    *    dataAttribute  : optional
    *    callback       : if needed any handling from caller , current jQuerey element passed as argument.
    * returns : undefined
    */
    bindAddComponent : function ( sWrapper, sElement, dataAttribute , callback) {
      if( !sWrapper || !sElement  ) return;
      var jWrapper  = $(sWrapper) ,
          attrKey   = dataAttribute || "data-component-to-add" ,
          entityKey , entityConfig
      ;
      $(sElement).off('click').on('click' , function () {
        entityKey = $(this).attr( attrKey ) ;
        if( entityKey ){
          entityConfig = formBuilder.getEntityConfig( entityKey );
          formBuilder.buildEntity( entityConfig , jWrapper);
          oThis.setConfiguratorChangedFlag( true );
          if( callback && typeof callback == 'function' ){
            callback( $(this) );
          }
        }
      });
    },


    isToShowAddMoreForToggle : function ( jEL , entityKey  ) {
      if( !jEL || !entityKey ) return false ;
      var showFooter    = true,
          toggleVal     = 0 ,
          selector
      ;
      for( var cnt = 0 ;  cnt < jEL.length ; cnt++ ){
        if( jEL.eq(cnt ).is(':checked') ){
          toggleVal = jEL.eq(cnt ).val();
        }
      }
      if( toggleVal == 1 ){
        showFooter = oThis.isToShowAddMore( entityKey );
      }else {
        showFooter = false  ;
      }
      selector = jEL.eq(0).attr('name') ;
      selector = "[name='" + selector + "']" ;
      oThis.showHideFooter( selector , showFooter );
    },

    updateSectionFooterForComponentAdd : function ( entityKey ) {
      var showFooter = oThis.isToShowAddMore( entityKey ) ,
          selector   = "."+entityKey
      ;
      oThis.showHideFooter( selector , showFooter);
    },

    isToShowAddMore  : function ( entityKey ) {
      var entityConfig  = formBuilder.getEntityConfig( entityKey ) ,
          validations   = entityConfig && entityConfig['validations'],
          maxCount      = validations && validations['max_count'] ,
          jElements     = $("."+entityKey),
          currLength    = jElements && jElements.length || 0,
          isShow        = true ;
      if( maxCount && maxCount <= currLength  ){
        return false ;
      }else {
        return true ;
      }
    },


    showHideFooter : function( selector , show ) {
      var jEntity         = $( selector ) ,
          jParentElement  = jEntity.closest('.card');
      if(show ){
        jParentElement.find('.card-footer').show();
      } else {
        jParentElement.find('.card-footer').hide();
      }
    },

    sanitizeDeleteIcon : function( entityKey ) {
      var sElement      = "."+entityKey ,
          jElements     = $(sElement) ,
          entityConfig  = formBuilder.getEntityConfig( entityKey ),
          validations   = entityConfig && entityConfig['validations'],
          minCount      = validations && validations['min_count']
      ;
      if( typeof minCount != 'number' ) return ;
      jElements.each( function( index, jEl) {
        if( index < minCount ){
          $(jEl).find( '.delete-component' ).hide();
        } else {
          $(jEl).find( '.delete-component' ).show();
        }
      });
    }

  };


})(window , jQuery);