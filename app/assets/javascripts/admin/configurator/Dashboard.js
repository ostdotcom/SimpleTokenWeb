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
      jPopUpToggle           = $('[name="show_ethereum_address_confirm_popup"]'),
      oThis
  ;

  oSTNs.dashboardConfigurator  = oThis = {init: function ( config ) {
      var showEthereumAddressConfirmPopUp   = formBuilder.getFormData( "show_ethereum_address_confirm_popup" );
      formBuilder.isBuildEntity =  function ( entityConfig ) {
        var entityKey = entityConfig['entityKey'] ;
        if( entityKey == toggleCmptEntityKey ) {
          return showEthereumAddressConfirmPopUp == 1 ? true : false ;
        }else {
          return true;
        }
      };
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.bindDeleteComponents();
      configuratorHelper.bindAccordionClick();
      configuratorHelper.bindDraggable( sParentSelector, sChildSelector );
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent, null,  oThis.addComponentCallback);
      configuratorHelper.bindPopUpToggleOption( jPopUpToggle , toggleCmptEntityKey, sParentSelector, oThis.popUpToggleOptionCallback );
      configuratorHelper.updateSectionFooter( jPopUpToggle,  toggleCmptEntityKey);
    },

    addComponentCallback : function( jElement ) {
      oThis.bindDeleteComponents();
      configuratorHelper.updateSectionFooter( jPopUpToggle,  toggleCmptEntityKey);
    },

    popUpToggleOptionCallback : function( jElement ) {
      configuratorHelper.updateSectionFooter( jElement,  toggleCmptEntityKey);
      oThis.bindDeleteComponents();
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
        configuratorHelper.updateSectionFooter( jPopUpToggle,  toggleCmptEntityKey);
      });
    }

  };

})(window , jQuery );