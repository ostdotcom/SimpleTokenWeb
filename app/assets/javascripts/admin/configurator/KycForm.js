;
(function (window  , $) {

  var oSTNs                  = ns("ost"),
      configuratorHelper     = ns('ost.configuratorHelper'),
      formBuilder            = ns('ost.formBuilder'),
      sParentSelector        = ".popup_kyc_configuration",
      sChildSelector         = ".tinymce-wrap",
      toggleCmptEntityKey    = "kyc_form_popup_checkboxes",
      toggleCmptElementKey   = "show_pop_up",
      addCmptElementSelector = ".add-component-el",
      addCmptAttrKey         = "data-component-to-add",
      sToggleElementSelector = "show_pop_up",
      oThis
  ;

  oSTNs.kycConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.hideToggleElementFooter( sToggleElementSelector );
      configuratorHelper.bindAccordionClick();
      configuratorHelper.bindDraggable( sParentSelector, sChildSelector );
      configuratorHelper.bindAddComponent( sParentSelector, addCmptAttrKey, addCmptElementSelector, oThis.bindAddComponentCallback);
      configuratorHelper.bindPopUpToggleOption( toggleCmptEntityKey, sParentSelector, toggleCmptElementKey, oThis.bindPopUpToggleOptionCallback );
      oThis.bindDeleteComponents();
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    },

    bindAddComponentCallback : function() {
      oThis.bindDeleteComponents();
      oThis.hideToggleElementFooter( sToggleElementSelector );
    },

    bindPopUpToggleOptionCallback : function( jElement ) {
      var value = jElement.val();
      if( value == 1) {
        oThis.bindDeleteComponents();
      }
      oThis.hideToggleElementFooter( sToggleElementSelector , value);
    },

    hideToggleElementFooter : function( sElementSelector, value) {
      var value = parseInt(value) || parseInt(formBuilder.getFormData(sElementSelector));
      var jElement = $('[name='+sElementSelector+']');
      var jParentElement = jElement.closest('.card');
      if( !value ){
        jParentElement.find('.card-footer').hide();
      } else {
        jParentElement.find('.card-footer').show();
      }
    }
  };

})(window , jQuery );