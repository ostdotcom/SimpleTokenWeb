;
(function (window ) {

  var oSTNs               = ns("ost"),
      fileUploader        = ns('ost.fileUploader'),
      richTextEditor      = ns('ost.richTextEditor'),
      handlebarHelper     = ns('ost.handlebarHelper'),
      configuratorConfig  = ns('ost.configuratorConfig'),
      oThis
  ;

  oSTNs.index = oThis = {

    init: function ( ) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      oThis.testComponents();
      oThis.testBind();
    },


    testComponents: function () {
      var jWrapper = $('.jCollapseContainer'),
          config  , sTemplate , jMarkup
      ;

      for( var key in configuratorConfig.testComponents ){
        config    = configuratorConfig.testComponents[ key ];
        console.log("config---" , config);
        sTemplate = oThis.getComponentTemplate( config.inputType );
        console.log("sTemplate---" , sTemplate);
        jMarkup   = handlebarHelper.getMarkup( sTemplate , config );
        jWrapper.append( jMarkup );
      }

    },

    getComponentTemplate : function ( type  ) {
      var inputTypes = configuratorConfig.getInputTypes();

      console.log( "type--" , type);

      switch ( type ){
        case inputTypes.fileType :
          return '#ost-file-uploader';
        break;
        case inputTypes.richTextEditor :
          return '#ost-tinymce-editor';
        break;
      }
    },

    testBind: function(){
      fileUploader.bindButtonActions();
      richTextEditor.initTinyMc('.tinymce-editor');
      $('[data-toggle="tooltip"]').tooltip();
    }
  };


  $(document).ready(function () {
    oThis.init(); //TODO this will be called from erb with backend data.
  });


})(window );