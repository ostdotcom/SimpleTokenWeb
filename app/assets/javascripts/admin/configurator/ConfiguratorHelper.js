;
(function (window , $ ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      iframe              = ns('ost.ostIframe'),
      uiConfigConstants   = ns('ost.uiConfigConstants'),
      oThis
  ;

  var jAjaxProcessingWrap  = $(".ajax-processing-wrapper"),
      jAjaxErrorWrap       = $(".ajax-error-wrapper"),

      sDeleteWrapper      = ".form-group"
  ;

  oSTNs.configuratorHelper = oThis = {
    formHelper  : null,

    initConfig  : {
      iframeUrl       : null
    }  ,

    configuratorData      : {}  ,
    configurationChanged  : false ,

    init : function ( config ,  callback ) {
      oThis.initConfig = config ; //Should be very first step.

      var ajaxConfig = oThis.getConfiguratorAjaxConfig( callback ) ;
      if( !ajaxConfig ) return ;
      $.ajax( ajaxConfig ) ;
      oThis.initFormHelper() ;
    },

    getConfiguratorAjaxConfig : function (  callback ) {
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

    onConfiguratorGetSuccess : function ( result , callback ) {
      if( result.success ){
        var data = result.data || {} ;
        oThis.configuratorData = data ;
        formBuilder.init( oThis.configuratorData );
        oThis.initCommonSettings( oThis.configuratorData );
        oThis.bindEvents();
        if( callback ){
          callback( data );
        }
      }else{
        oThis.showConfiguratorErrorOverlay( result );
      }
    },

    onConfiguratorError : function (  jqXhr , error  ) {
      oThis.showConfiguratorErrorOverlay( error );
    },

    onConfiguratorComplete : function ( res ) {
      jAjaxProcessingWrap.hide();
    },

    showConfiguratorErrorOverlay : function ( response ) {
      var err     = response && response.err,
        errMsg  = err && err.display_text
      ;
      if( errMsg ){
        jAjaxErrorWrap.find('.error-message').html( errMsg );
      }
      jAjaxErrorWrap.show();
    },

    initCommonSettings : function ( data ) {
      var rules      = data && data['rules'] ,
          canReset   = rules["can_reset"]  ,
          canPublish = rules["can_publish"]
      ;
      if( canReset ) {
        $('#reset-configurator-changes').show();
      }
      if( canPublish ){
        $('#publish-changes-btn').show();
      }

      iframe.loadUrlInIframe( oThis.initConfig.iframeUrl );
    },

    getConfiguratorApi : function ( config ) {
      return oThis.initConfig && oThis.initConfig.configuratorGetApi ;
    },

    getConfiguratorMethod : function( config ){
      return oThis.initConfig && oThis.initConfig.configuratorMethod ||"GET" ;
    },

    getConfiguratorParams : function ( config ) {
      return oThis.initConfig && oThis.initConfig.configuratorParams;
    },

    getPublishApi : function () {
      return oThis.initConfig && oThis.initConfig.publishApi ;
    },

    getResetApi : function () {
      return oThis.initConfig && oThis.initConfig.resetApi ;
    },

    onCmsExitBtnClick : function () {
      $("#exit-cms-modal").modal('show');
    },

    onCmsExitConfirmationBtnClick : function () {
      window.location.href = "/admin/dashboard" ;
    },


    bindEvents : function () {

      $('#save-and-preview-btn-click').on('click' , function () {
        oThis.onSaveAndPreviewClick( $(this) );
      });

      $("#configurator-form").on('change' , "input , textarea" , function () {
        oThis.configurationChanged =  true ;
      });

      $("#exit-cms-btn").on('click' , function () {
        oThis.onCmsExitBtnClick();
      });

      $('#reset-configurator-changes').on('click' , function () {
        oThis.resetChangesClick();
      });

      $('#publish-changes-btn').on('click' , function () {
        oThis.publishChangesClick();
      });

      $(window).bind("beforeunload",function(event) {
        if( oThis.configurationChanged ) {
          return " There are unsaved changes made to this page."
        }
      });

    },

    initFormHelper : function () {
      var jEl         = $('#save-and-preview-btn-click'),
          jErrorModal = $('#issues-while-submitting'),
          jForm       = $('#configurator-form')
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
            oThis.onRequestFailure( jErrorModal , res );
          }
        },
        error: function ( jqXhr ,  error ) {
          oThis.onRequestFailure( jErrorModal , error );
        },
        complete: function () {
          var preSubmitText   = jEl.data('pre-submit-text');
          jEl.text( preSubmitText );
          jEl.prop( "disabled", false );
        }
      });
    },

    onSaveAndPreviewClick : function ( jEl ) {
      oThis.formHelper.jForm.submit();
    },

    onSaveAndPreviewSuccess : function ( res ) {
      iframe.loadUrlInIframe( oThis.initConfig.iframeUrl );
    },

    //to do later should have individual callbacks
    resetChangesClick : function () {
      var api       = oThis.getResetApi() ,
          jModal    = $('#reset-changes-modal')
      ;
      if( !api ) return ;
      $.ajax({
        url: api,
        method: "POST",
        beforeSend : function () {
          jModal.modal('show');
        },
        success : function ( res ) {
          if( res.success ){
            oThis.onRequestSuccess( jModal , res );
          }else{
            oThis.onRequestFailure(jModal , res );
          }
        },
        error: function (jqXhr ,  error ) {
          oThis.onRequestFailure(jModal ,  error );
        }
      });
    },

    //to do later should have individual callbacks
    publishChangesClick : function (  ) {
      var api     = oThis.getPublishApi() ,
          jModal  = $('#publish-changes-modal')
      ;
      if( !api ) return ;
      $.ajax({
        url: api,
        method: "POST",
        beforeSend : function () {
          jModal.modal('show');
        },
        success : function ( res ) {
          if( res.success ){
           oThis.onRequestSuccess( jModal ,  res );
          }else{
            oThis.onRequestFailure(jModal , res );
          }
        },
        error: function (jqXhr ,  error ) {
          oThis.onRequestFailure(jModal ,  error );
        }
      });
    },

    onRequestFailure : function ( jModal ,  res ) {
      var error   = res.err ,
          errMsg  = error['display_text']
      ;
      if( errMsg ){
        jModal.find('.error-message').text( errMsg );
      }
      jModal.find('.state-handler').hide();
      jModal.find('.error-state').show();
      jModal.modal('show');
    },

    onRequestSuccess : function ( jModal ,  res ) {
      location.reload();
      jModal.modal('hide');
    },

    deleteComponent : function( jEL , sWrapperToDelete  ) {
      var sDeleteEl = sWrapperToDelete || sDeleteWrapper,
          jDeleteEl = jEL.closest( sDeleteEl )
      ;
      jDeleteEl.remove();
      return jDeleteEl;
    },

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
     }

  };


})(window , jQuery);