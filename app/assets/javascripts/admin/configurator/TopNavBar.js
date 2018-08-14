
(function (window ) {

  var oSTNs               = ns("ost"),
    formBuilder         = ns('ost.formBuilder'),
    oThis
  ;

  oSTNs.configuratorTopNav  = oThis = {

    init: function ( config ) {
      oThis.bindEvents();
    },

    bindEvents : function () {
      oThis.bindNavProducts();
      oThis.bindConfiguratorOptionsChange();
      oThis.bindPublishChangesBtnClick();
      oThis.bindResetChangesBtnClick();
      oThis.bindCopyToClipboardChanges();
    },

    bindNavProducts : function () {
      var jNavProducts  =  $(".nav-products") ,
          sMegaDropDown = '.mega-dropdown-menu'
      ;
      jNavProducts.mouseenter( function () {
        $(this).find(sMegaDropDown).addClass('open');
      });
      jNavProducts.mouseleave( function () {
        $(this).find(sMegaDropDown).removeClass('open');
      });
    },

    bindConfiguratorOptionsChange : function () {

    },

    bindPublishChangesBtnClick : function () {

    },

    bindResetChangesBtnClick : function () {

    },

    bindCopyToClipboardChanges : function () {

    }

  };

  $( function () {
    oThis.init( {} );
  });

})(window , jQuery );