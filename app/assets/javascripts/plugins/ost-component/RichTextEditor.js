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

  function getSanitizedContent( content ) {
    var replaceString   = "&nbsp;" ,
        replaceBy       = " " ,
        trimmedContent  = ""
    ;
    if( content ){
      trimmedContent = content.replace( new RegExp( replaceString , 'g'), replaceBy );
      trimmedContent = trimmedContent.replace(/\s\s+/g, replaceBy );
      trimmedContent = trimmedContent.trim();
    }

    return trimmedContent ;
  }

  var tinyMceConfig =  {
      menubar                 : false,
      plugins                 : ['link'],
      toolbar                 : 'bold, italic, underline, link',
      statusbar               : false,
      toolbar_item_size       : "small",
      forced_root_block       : false,
      extended_valid_elements : "*[*]",
      toolbar_items_size: "small",
      setup: function (editor) {
        editor.on('keyup change', function () {
          var jTextArea       = getTextArea( tinymce.activeEditor ),
              updatedContent  = tinymce.activeEditor.getContent()
          ;
          updatedContent = getSanitizedContent( updatedContent );
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

    getTinyMceConfig : function () {
      return tinyMceConfig;
    } ,

    initTinyMc : function ( selector , config ) {
      if(!selector) return ;
      var tinyMceInitConfig = config || oThis.getTinyMceConfig()
      ;
      tinyMceInitConfig['selector'] = selector;
      tinymce.init(  tinyMceInitConfig );
    }
  };

})(window );