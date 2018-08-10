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

  };


  //jQuerry related stuff
  $.fn.extend({

    addOstComponent : function( sWrap ) {
      var jEl       =   $(this),
          sWrapper  = sWrap || sAddComponentWrap,
          jComponentKey , componentKey,
          jWrapper
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
        formBuilder.buildEntity( jWrapper , componentKey );
      }
    },

    deleteOstComponent : function( sWrapperToDelete ) {
      var jEl = $(this)  ,
          sDeleteEl = sWrapperToDelete || sDeleteWrapper,
          jDeleteEl = jEl.closest( sDeleteEl )
      ;
      jDeleteEl.remove();
    }

  })

})(window );