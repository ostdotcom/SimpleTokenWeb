;
(function (window , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      oThis
  ;

  oSTNs.dashboardConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.getPageData( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      formBuilder.init( data );
    }

  };

})(window , jQuery );