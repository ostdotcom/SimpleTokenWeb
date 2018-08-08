;
(function (window ) {

  var oSTNs           = ns("ost"),
    oThis
  ;

  function getTextArea( inst ){
    var hParent   = inst.editorContainer,
        jParent   = $( hParent ),
        jTextArea = jParent.parent().find('.tinymce-editor')
    ;
    return jTextArea;
  }

  var tinyMceConfig =  {
      menubar                 : false,
      plugins                 : ['link'],
      toolbar                 : 'bold ,italic ,underline, link',
      statusbar               : false,
      toolbar_item_size       : "small",
      forced_root_block       : false,
      extended_valid_elements : "*[*]",
      setup: function (editor) {
        editor.on('keyup change', function () {
          var jTextArea       = getTextArea( tinymce.activeEditor ),
              updatedContent  = tinymce.activeEditor.getContent()
          ;
          jTextArea && jTextArea
            .val( updatedContent )
            .trigger('change');
      });
    },
    init_instance_callback : function ( inst ) {
      var jTextArea       = getTextArea( inst ),
          initialVal      = jTextArea && jTextArea.val( ) || ""
      ;
      inst.setContent( initialVal );
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