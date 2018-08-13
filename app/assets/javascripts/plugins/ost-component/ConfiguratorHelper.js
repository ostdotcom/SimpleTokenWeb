;
(function (window , $ ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      uiConfigConstants   = ns('ost.uiConfigConstants'),
      oThis
  ;

  var jAjaxProcessingWrap  = $(".ajax-processing-wrapper"),
      jAjaxErrorWrap       = $(".ajax-error-wrapper"),
    
      addComponentWrap    = "data-component-to-add" ,
      sDeleteWrapper      = ".form-group" ,
      sAddComponentWrap   = uiConfigConstants.getSectionContentWrapper()
  ;

  oSTNs.configuratorHelper = oThis = {

    getPageData : function ( config ,  callback ) {
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
      if( api ) return false;
      ajaxConfig = {
        url     : api ,
        method  : method,
        beforeSend : function () {
          jAjaxProcessingWrap.show(); 
        },
        success: function(result) {
          if( result.success ){
            if( callback ){
              callback( result.data );
            }
          }else{
            oThis.showError( result );
          }
        },
        error : function ( jqXhr , error ) {
          oThis.showError( error );
        },
        complete: function () {
          jAjaxProcessingWrap.hide();
        }
      } ;
      if( params ){
        ajaxConfig['data'] = params ;
      }

      return ajaxConfig ;
    },

    getApi : function ( config ) {
      return config && config.url ;
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
    }

  };


  //jQuerry related stuff
  $.fn.extend({

    addOstComponent : function( callBack ) {
      var jEl       = $(this),
          sWrapper  = sAddComponentWrap,
          jComponentKey , componentKey,
          jWrapper , jMarkup
      ;

      if( jEl.attr( addComponentWrap )){
        jComponentKey = jEl ;
      }else{
        jComponentKey = jEl.closest( addComponentWrap );
      }

      if( jComponentKey ) {
        componentKey  = jComponentKey.attr( addComponentWrap );
        jWrapper      = jComponentKey.closest( sWrapper );
      }

      if( componentKey ){
        jMarkup  = formBuilder.getBuildEntityMarkup( componentKey );
        if( callBack ){
          callBack( jMarkup , jWrapper , jEl );
          return;
        }
      }

      jWrapper.append( jMarkup );
    },

    deleteOstComponent : function( sWrapperToDelete ,  callback) {
      var jEl = $(this)  ,
          sDeleteEl = sWrapperToDelete || sDeleteWrapper,
          jDeleteEl = jEl.closest( sDeleteEl )
      ;
      if( callback ){
        callback( jDeleteEl , jEl );
      }else {
        jDeleteEl.remove();
      }
    }

  })

})(window , jQuery);