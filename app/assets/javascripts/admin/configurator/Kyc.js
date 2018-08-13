;
(function (window ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper = ns('ost.configuratorHelper'),
      oThis
  ;

  oSTNs.kycConfigurator  = oThis = {

    init: function ( config ) {
      formBuilder.init({}); //TODO delete after integration

      configuratorHelper.getPageData({} , function ( data ) {
        formBuilder.init( data );
        oThis.bindDraggable( );
        oThis.bindAddComponent()
      });

    },

    bindDraggable : function (   ) {
      $( ".section-content-wrap" ).sortable({
        items: ".tinymce-wrap",
        axis: 'y',
        cursor: 'move'
      });
    },

    bindAddComponent : function () {
      $('.add-component-el').on('click' , function () {
        $(this).addOstComponent();
      });
    }


  };

})(window );