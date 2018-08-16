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
    initConfig        : null ,
    configuratorData  : null ,

    init : function ( config ,  callback ) {
      oThis.initConfig = config ;
      var ajaxConfig = oThis.getAjaxConfig( config , callback ) ;
      if( !ajaxConfig ) return ;
      $.ajax( ajaxConfig );
    },

    getAjaxConfig : function ( config , callback ) {
      var api    = oThis.getApi( config ) ,
          method = oThis.getMethod( config ) || "GET",
          params = oThis.getParams( config ) ,
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
          oThis.onSuccess( res , callback );
        },
        error : function ( jqXhr , error ) {
          oThis.onError.apply(oThis, arguments );

        },
        complete: function ( res ) {
          oThis.onComplete.apply(oThis, arguments ) ;
        }
      } ;
      if( params ){
        ajaxConfig['data'] = params ;
      }
      return ajaxConfig ;
    },

    onSuccess : function ( result , callback ) {
      if( result.success ){

        var data = result.data || {} ;
        oThis.configuratorData = data ;
        formBuilder.init( data );
        oThis.initCommonSettings( data );

        if( callback ){
          callback( data );
        }

      }else{
        oThis.showError( result );
      }
    },

    onError : function (  jqXhr , error  ) {
      oThis.showError( error );
    },

    onComplete : function ( res ) {
      jAjaxProcessingWrap.hide();
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
    },

    getApi : function ( config ) {
      return config && config.api ;
    },

    getMethod : function( config ){
      return config && config.method ||"GET" ;
    },

    getParams : function ( config ) {
      return config && config.params || {};
    },

    showError : function ( response ) {
      var err     = response && response.err,
          errMsg  = err && err.display_text
      ;
      if( errMsg ){
        jAjaxErrorWrap.find('.error-message').html( errMsg );
      }
      jAjaxErrorWrap.show(); 
    },

    addComponent : function( jEl , jWrapper  ) {
      var jComponentKey , componentKey,
          jMarkup = ""
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
        jMarkup = formBuilder.buildEntity( componentKey , jWrapper);
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
        iframeUrl = jEl.data('iframe-url');
        jEl.siblings(sSelector).find(sSlider).slideUp();
        jEl.find(sSlider).slideDown();
        iframe.loadUrlInIframe( iframeUrl );
      });
    }

  };


})(window , jQuery);