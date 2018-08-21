;
(function (window , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      sParentSelector     = ".form_field_options" ,
      sAddComponent       = ".add-component-el",
      oThis
  ;

  oSTNs.registerConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.bindDeleteComponents();
      configuratorHelper.bindAccordionClick();
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent ,  null , oThis.addComponentCallback );
    },

    addComponentCallback : function () {
      oThis.bindDeleteComponents();
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    }

  };

})(window, jQuery );