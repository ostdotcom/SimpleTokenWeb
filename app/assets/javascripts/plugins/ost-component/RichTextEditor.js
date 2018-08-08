;
(function (window ) {

  var oSTNs           = ns("ost"),
    oThis
  ;

  var tinyMceConfig =  {
      menubar                 : false,
      plugins                 : ['link'],
      toolbar                 : 'bold ,italic ,underline, link',
      statusbar               : false,
      toolbar_item_size       : "small",
      forced_root_block       : false,
      extended_valid_elements : "*[*]",
      setup: function (editor) {
        editor.on('change', function () {
          var hParent         = tinymce.activeEditor.editorContainer,
              jParent         = $( hParent ),
              jTextArea       = jParent.parent().find('textarea.tinymce'),
              updatedContent  = tinymce.activeEditor.getContent()
          ;
          jTextArea
            .val( updatedContent )
            .trigger('keyup');
      });
    }
  };

  oSTNs.richTextEditor = oThis = {
    events : 'change',

    getTinyMceConfig : function () {
      return tinyMceConfig;
    } ,

    initTinyMc : function ( selector , config ) {
      if(!selector) return ;
      var tinyMceInitConfig = config || oThis.getTinyMceConfig()
      ;
      tinyMceInitConfig['selector'] = selector;
      console.log( "tinyMceInitConfig" ,  tinyMceInitConfig );
      tinymce.init(  tinyMceInitConfig );
    }
  };

})(window );