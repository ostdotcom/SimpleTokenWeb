;
(function (window  , $) {

  var oSTNs                  = ns("ost"),
      configuratorHelper     = ns('ost.configuratorHelper'),
      formBuilder            = ns('ost.formBuilder'),
      sParentSelector        = ".popup_kyc_configuration",
      sChildSelector         = ".tinymce-wrap",
      toggleCmptEntityKey    = "kyc_form_popup_checkboxes",
      sAddComponent          = ".add-component-el",
      sPopUpToggle           = '[name="show_kyc_confirm_popup"]',
      oThis
  ;

  oSTNs.kycConfigurator  = oThis = {

    init: function ( config ) {
      var showKycConfirmPopUp   = formBuilder.getFormData( "show_kyc_confirm_popup" );
      formBuilder.isBuildEntity =  function ( entityConfig ) {
        var entityKey = entityConfig['entityKey'] ;
        if( entityKey == toggleCmptEntityKey ) {
          return showKycConfirmPopUp == 1 ? true : false ;
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
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent, null ,oThis.addComponentCallback );
      configuratorHelper.bindPopUpToggleOption( toggleCmptEntityKey, sParentSelector, sPopUpToggle , oThis.popUpToggleOptionCallback );
      configuratorHelper.updatePopUpFooter( $(sPopUpToggle) );
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