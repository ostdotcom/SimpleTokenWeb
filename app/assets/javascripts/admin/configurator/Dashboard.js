;
(function (window , $) {

  var oSTNs                  = ns("ost"),
      configuratorHelper     = ns('ost.configuratorHelper'),
      formBuilder            = ns('ost.formBuilder'),
      sParentSelector        = ".popup_options",
      sChildSelector         = ".tinymce-wrap",
      toggleCmptEntityKey    = "ethereum_deposit_popup_checkboxes",
      sAddComponent          = ".add-component-el",
      addCmptAttrKey         = "data-component-to-add",
      sPopUpToggle           = '[name="show_ethereum_address_confirm_popup"]',
      oThis
  ;

  oSTNs.dashboardConfigurator  = oThis = {init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.bindDeleteComponents();
      configuratorHelper.bindAccordionClick();
      configuratorHelper.bindDraggable( sParentSelector, sChildSelector );
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent, null,  oThis.addComponentCallback);
      configuratorHelper.bindPopUpToggleOption( toggleCmptEntityKey, sParentSelector, sPopUpToggle, oThis.popUpToggleOptionCallback );
      configuratorHelper.updatePopUpFooter( $( sPopUpToggle ) );
    },

    addComponentCallback : function( jElement ) {
      oThis.bindDeleteComponents();
    },

    popUpToggleOptionCallback : function( jElement ) {
      configuratorHelper.updatePopUpFooter( jElement );
      oThis.bindDeleteComponents();
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    }

  };

})(window , jQuery );