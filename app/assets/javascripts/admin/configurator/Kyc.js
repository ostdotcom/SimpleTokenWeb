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
      oThis.onSuccess({}); //TODO delete after integration

      //configuratorHelper.getPageData({} , oThis.onSuccess ); //TODO uncomment after integration

    },

    onSuccess : function ( data ) {
      formBuilder.init( data );
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
        configuratorHelper.addComponent( $(this) , $('.section-content-wrap.form_field_options') );
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