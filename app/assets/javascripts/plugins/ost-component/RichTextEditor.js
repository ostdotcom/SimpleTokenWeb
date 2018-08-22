;
(function (window ) {

  var oSTNs           = ns("ost"),
    oThis
  ;

  var tinyMceBodyClass = "tiny-mce-editor-inline-body",
      tinyMceBodyStyle = ".tiny-mce-editor-inline-body { color: #597A84; font-size: 0.7rem; font-weight: 100; letter-spacing: 0.2px;}",
      pluginOptions    = ['link'] ,
      toolbarOptions   = 'bold, italic, underline, link'
  ;

  var tinyMceConfig =  {
      body_class              : tinyMceBodyClass,
      content_style           : tinyMceBodyStyle,
      plugins                 : pluginOptions,
      toolbar                 : toolbarOptions,
      statusbar               : false,
      menubar                 : false,
      forced_root_block       : false,
      toolbar_item_size       : "small",
      toolbar_items_size      : "small",
      extended_valid_elements : "*[*]",

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

  oSTNs.richTextEditor = oThis = {

    getTinyMceConfig : function () {
      var configCopy = {} ;
      $.extend( true , configCopy , tinyMceConfig );
      return configCopy;
    } ,

    initTinyMc : function ( selector , config ) {
      if( !selector ) return ;
      var tinyMceInitConfig = oThis.getTinyMceConfig();
      if ( config && typeof config === "object") {
        $.extend( tinyMceInitConfig , config );
      }
      tinyMceInitConfig['selector'] = selector;
      tinymce.init(  tinyMceInitConfig );
    }
  };

})(window );