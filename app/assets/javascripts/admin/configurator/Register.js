;
(function (window , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      oThis
  ;

  oSTNs.registerConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.getPageData( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      formBuilder.init( data );
      configuratorHelper.bindAccordionClick();
    }

  };

})(window, jQuery );