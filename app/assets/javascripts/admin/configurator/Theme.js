;
(function (window , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      oThis
  ;

  oSTNs.themeConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {

    }


  };

})(window , jQuery);