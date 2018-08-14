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
    },

    bindDraggable : function (  ) {
      $( ".section-content-wrap" ).sortable({
        items: ".tinymce-wrap",
        axis: 'y',
        cursor: 'move'
      });
    },

    bindAddComponent : function () {
      var jWrapper = $('.terms-condition-wrapper') ,
          jMarkup
      ;
      $('.add-component-el').on('click' , function () {
        jMarkup = configuratorHelper.getAddOstComponentMarkup( $(this) );
        jWrapper.append( jMarkup );
        richTextEditor.initTinyMc( );
      });
    }


  };

})(window , jQuery );