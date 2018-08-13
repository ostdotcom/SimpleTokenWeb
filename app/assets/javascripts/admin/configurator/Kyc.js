;
(function (window ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      richTextEditor      = ns('ost.richTextEditor'),
      oThis
  ;

  oSTNs.kycConfigurator  = oThis = {

    init: function ( config ) {
      formBuilder.init({});

      $( ".collapse-content-wrap" ).sortable({
        items: ".tinymce-wrap",
        axis: 'y',
        cursor: 'move'
      });
    }

  };

})(window );