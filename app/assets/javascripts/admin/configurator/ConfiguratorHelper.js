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
    
      addComponentWrap    = "data-component-to-add" ,
      sDeleteWrapper      = ".form-group"
  ;

  oSTNs.configuratorHelper = oThis = {
    initConfig            : null  ,
    configuratorData      : null  ,
    configurationChanged  : false ,

    init : function ( config ,  callback ) {
      oThis.initConfig = config ; //Should be very first step.

      var ajaxConfig = oThis.getConfiguratorAjaxConfig( callback ) ;
      if( !ajaxConfig ) return ;
      $.ajax( ajaxConfig );
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
        formBuilder.init( data );
        oThis.initCommonSettings( data );
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
        oThis.onSaveAndPreviewClick();
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

    onSaveAndPreviewClick : function ( jEl ) {
      var jForm       = $('#configurator-form') ,
          formHelper  =  jForm.formHelper({
            beforeSend : function () {
              var preSubmitText   = jEl.text() ,
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
                oThis.onRequestFailure(  $('#issues-while-submitting') , res );
              }
            },
            error: function ( jqXhr ,  error ) {
              oThis.onRequestFailure(  $('#issues-while-submitting') , error );
            },
            complete: function () {
              var preSubmitText   = jEl.data('pre-submit-text');
              jEl.text( preSubmitText );
              jEl.prop( "disabled", false );
            }
          });
    },

    onSaveAndPreviewSuccess : function ( res ) {
      //TODO handle iframe reload.
    },

    resetChangesClick : function () {
      var api     = oThis.getResetApi() ,
          jModal  = $('#reset-changes-modal')
      ;
      if( api ) return ;
      $.ajax({
        url: api,
        methods: "POST",
        beforeSend : function () {
          jModal.modal('show');
        },
        success : function ( res ) {
          if( res.success ){

          }else{
            oThis.onRequestFailure(jModal , res );
          }
        },
        error: function (jqXhr ,  error ) {
          oThis.onRequestFailure(jModal ,  error );
        }
      });
    },

    publishChangesClick : function (  ) {
      var api     = oThis.getPublishApi() ,
          jModal  = $('#publish-changes-modal')
      ;
      if( api ) return ;
      $.ajax({
        url: api,
        methods: "POST",
        beforeSend : function () {
          jModal.modal('show');
        },
        success : function ( res ) {
          if( res.success ){

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
      jModal.find('.state-handler').hide();
      jModal.find('.success-state').show();
      jModal.modal('show');
    },

    addComponent : function( jEl , jWrapper  ) {
      var jComponentKey , componentKey,
          entityConfig , jMarkup = ""
      ;

      if( jEl.attr( addComponentWrap )){
        jComponentKey = jEl ;
      }else{
        jComponentKey = jEl.closest( addComponentWrap );
      }

      if( jComponentKey ) {
        componentKey  = jComponentKey.attr( addComponentWrap );
      }

      if( componentKey ){
        entityConfig = formBuilder.getEntityConfig( componentKey );
        jMarkup = formBuilder.buildEntity( entityConfig , jWrapper);
      }

     return jMarkup;
    },

    deleteComponent : function( jEL , sWrapperToDelete  ) {
      var sDeleteEl = sWrapperToDelete || sDeleteWrapper,
          jDeleteEl = jEL.closest( sDeleteEl )
      ;
      jDeleteEl.remove();
      return jDeleteEl;
    },

    bindAccordionClick : function ( sSelector  , sSlider ) {
      var sSelector = sSelector || '.accordion' ,
          sSlider   = sSlider   || '.accordion-content-wrapper' ,
          jEl  , iframeUrl;
        ;
      $( sSelector ).on('click' , function () {
        jEl = $(this) ;
        jEl.siblings(sSelector).find(sSlider).slideUp();
        jEl.find(sSlider).slideDown();
       oThis.onAccordionClickIframeLoad( jEl );
      });
    },

    onAccordionClickIframeLoad : function ( jEl ) {
      var  iframeUrl ;  //TODO backend integration.

      iframe.loadUrlInIframe( iframeUrl );
    }

  };


})(window , jQuery);