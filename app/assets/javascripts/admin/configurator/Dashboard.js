;
(function (window , $) {

  var oSTNs                  = ns("ost"),
      configuratorHelper     = ns('ost.configuratorHelper'),
      formBuilder            = ns('ost.formBuilder'),
      jParentSelector        = ".popup_options",
      jChildSelector         = ".tinymce-wrap",
      toggleCmptEntityKey    = "ethereum_deposit_popup_checkboxes",
      toggleCmptElementKey   = "toggle_input",
      addCmptElementSelector = ".add-component-el",
      addCmptAttrKey         = "data-component-to-add",
      sToggleElementSelector = "toggle_input",
      oThis
  ;

  oSTNs.dashboardConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.hideToggleElementFooter( sToggleElementSelector );
      configuratorHelper.bindAccordionClick();
      configuratorHelper.bindDraggable( jParentSelector, jChildSelector );
      configuratorHelper.bindAddComponent( jParentSelector, addCmptAttrKey, addCmptElementSelector, oThis.bindAddComponentCallback);
      configuratorHelper.bindPopUpToggleOption( toggleCmptEntityKey, jParentSelector, toggleCmptElementKey, oThis.bindPopUpToggleOptionCallback );
      oThis.bindDeleteComponents();
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    },

    bindAddComponentCallback : function() {
      oThis.bindDeleteComponents();
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