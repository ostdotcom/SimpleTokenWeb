;
(function (window , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      oThis
  ;

  oSTNs.themeConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.getPageData({
        'api' : "api/admin/configurator/theme/config?gid=1&uuid=1131312"
      } , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      formBuilder.init( data );
    }


  };

})(window , jQuery);