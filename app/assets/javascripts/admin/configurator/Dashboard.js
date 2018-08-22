;
(function (window , $) {

  var oSTNs                  = ns("ost"),
      configuratorHelper     = ns('ost.configuratorHelper'),
      formBuilder            = ns('ost.formBuilder'),
      sParentSelector        = ".popup_options",
      sChildSelector         = ".tinymce-wrap",
      toggleCmptEntityKey    = "ethereum_deposit_popup_checkboxes",
      sAddComponent          = ".add-component-el",
      sPopUpToggle           = '[name="show_ethereum_address_confirm_popup"]',
      oThis
  ;

  oSTNs.dashboardConfigurator  = oThis = {
    jPopUpToggle : null,

    init: function ( config ) {

      formBuilder.isBuildEntity =  function ( entityConfig ) {
        var entityKey = entityConfig['entityKey'] ;
        if( entityKey == toggleCmptEntityKey ) {
          var showEthereumAddressConfirmPopUp   = formBuilder.getFormData( "show_ethereum_address_confirm_popup" );
          return showEthereumAddressConfirmPopUp == 1 ? true : false ;
        }else {
          return true;
        }
      };
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.bindSortableStop();
      oThis.bindDeleteComponents();
      configuratorHelper.bindAccordionClick();
      oThis.jPopUpToggle = $( sPopUpToggle );
      configuratorHelper.bindDraggable( sParentSelector, sChildSelector );

      //not liking this code. Change it if time.
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent, null,  oThis.addComponentCallback);
      configuratorHelper.bindPopUpToggleOption(  oThis.jPopUpToggle , toggleCmptEntityKey, sParentSelector, oThis.popUpToggleOptionCallback );
      configuratorHelper.updateSectionFooter(  oThis.jPopUpToggle,  toggleCmptEntityKey);
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    addComponentCallback : function( jElement ) {
      oThis.bindDeleteComponents();
      configuratorHelper.updateSectionFooter(  oThis.jPopUpToggle,  toggleCmptEntityKey);
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    draggableCallback : function( jElement ) {
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    popUpToggleOptionCallback : function( jElement ) {
      configuratorHelper.updateSectionFooter( jElement,  toggleCmptEntityKey);
      oThis.bindDeleteComponents();
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
        configuratorHelper.updateSectionFooter(  oThis.jPopUpToggle,  toggleCmptEntityKey);
      });
    },

    bindSortableStop : function() {
      $( sParentSelector ).on( "sortstop", function( event, ui ) {
        oThis.draggableCallback( ui.item);
      });
    }

  };

})(window , jQuery );