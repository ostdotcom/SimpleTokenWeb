;
(function (window  , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      richTextEditor      = ns('ost.richTextEditor') ,
      oThis
  ;

  oSTNs.kycConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.getPageData( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      configuratorHelper.bindAccordionClick();
      oThis.bindDraggable( );
      oThis.bindAddComponent();
      oThis.bindDeleteComponents();
    },

    bindDraggable : function (  ) {
      $( ".section-content-wrap" ).sortable({
        items: ".tinymce-wrap",
        axis: 'y',
        cursor: 'move'
      });
    },

    bindAddComponent : function () {
      $('.add-component-el').on('click' , function () {
        configuratorHelper.addComponent( $(this) , $('.popup_kyc_configuration') );
        oThis.bindDeleteComponents();
      });
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    }



  };

})(window , jQuery );