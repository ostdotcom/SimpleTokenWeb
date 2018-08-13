;
(function (window ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      oThis
  ;

  var addComponentWrap  = "data-component-to-add" ,
      sAddComponentWrap = ".collapse-content-wrap",
      sDeleteWrapper    = ".form-group"
  ;

  oSTNs.configuratorHelper = oThis = {

    getPageData : function ( config ,  callback ) {
      var api    = oThis.getApi( config ) ,
          method = oThis.getMethod( config ) ,
          params = oThis.getParams( config )
      ;
      if( api ) return ;

      $.ajax({
        url     : api ,
        method  : method,
        data    : oThis.getParams( config ),
        success: function(result) {
          if( result.success ){
            callback( result.data );
            formBuilder.init( result.data );
          }else{
            oThis.showError( result );
          }
        },
        error : function ( jqXhr , error ) {
          oThis.showError( error );
        }
      });
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

    }

  };


  //jQuerry related stuff
  $.fn.extend({

    addOstComponent : function( sWrap ,  callBack ) {
      var jEl       =   $(this),
          sWrapper  = sWrap || sAddComponentWrap,
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
        if( callBack ){
          callBack( jMarkup ,jWrapper ,  jEl );
          return;
        }
        jMarkup  = formBuilder.getBuildEntityMarkup( componentKey );
        jWrapper.append();
      }
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

})(window );