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
      sTimerToggle           = '[name="show_sale_timer"]' ,
      sTimerToggleChecked    = '[name="show_sale_timer"]:checked',
      sTimerToggleElements   = '.sale_timer_text_color , .sale_timer_background_gradient, .dashboard_title_text_color' ,
      oThis
  ;

  oSTNs.dashboardConfigurator  = oThis = {

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
      var jPopUpToggle  = null ,
          showSaleTimer = data['form_data']['show_sale_timer']
      ;
      oThis.bindSortableStop();
      oThis.bindDeleteComponents();
      configuratorHelper.bindAccordionClick();
      jPopUpToggle = $( sPopUpToggle );
      configuratorHelper.bindDraggable( sParentSelector, sChildSelector );

      //not liking this code. Change it if time.
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent, null,  oThis.addComponentCallback);
      configuratorHelper.bindPopUpToggleOption(  jPopUpToggle , toggleCmptEntityKey, sParentSelector, oThis.popUpToggleOptionCallback );
      configuratorHelper.isToShowAddMoreForToggle(  jPopUpToggle,  toggleCmptEntityKey);
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
      if( $(sTimerToggleChecked).val() == 0 ) {
        $(sTimerToggleElements).hide();
      }
      configuratorHelper.bindToggleShowHide( $(sTimerToggle) , sTimerToggleElements );
    },

    addComponentCallback : function( jElement ) {
      oThis.bindDeleteComponents();
      configuratorHelper.updateSectionFooterForComponentAdd( toggleCmptEntityKey);
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    draggableCallback : function( jElement ) {
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    popUpToggleOptionCallback : function( jElement ) {
      configuratorHelper.isToShowAddMoreForToggle( jElement, toggleCmptEntityKey );
      oThis.bindDeleteComponents();
      configuratorHelper.sanitizeDeleteIcon( toggleCmptEntityKey);
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
        configuratorHelper.updateSectionFooterForComponentAdd( toggleCmptEntityKey );
      });
    },

    bindSortableStop : function() {
      $( sParentSelector ).on( "sortstop", function( event, ui ) {
        oThis.draggableCallback( ui.item);
      });
    }

  };

})(window , jQuery );