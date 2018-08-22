;
(function (window , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      sParentSelector     = ".form_field_options",
      sChildSelector      = ".tinymce-wrap",
      sAddComponent       = ".add-component-el",
      entityKey           = "policy_texts",
      oThis
  ;

  oSTNs.registerConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      oThis.bindSortableStop();
      oThis.bindDeleteComponents();
      configuratorHelper.bindAccordionClick();
      configuratorHelper.bindDraggable( sParentSelector, sChildSelector );
      configuratorHelper.bindAddComponent( sParentSelector, sAddComponent ,  null , oThis.addComponentCallback );
      configuratorHelper.sanitizeDeleteIcon( entityKey);
    },

    addComponentCallback : function () {
      oThis.bindDeleteComponents();
      configuratorHelper.sanitizeDeleteIcon( entityKey);
    },

    draggableCallback : function( jElement ) {
      configuratorHelper.sanitizeDeleteIcon( entityKey);
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    },

    bindSortableStop : function() {
      $( sParentSelector ).on( "sortstop", function( event, ui ) {
        oThis.draggableCallback( ui.item);
      });
    }

  };

})(window, jQuery );