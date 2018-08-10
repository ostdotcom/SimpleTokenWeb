;
(function (window ) {

  var oSTNs           = ns("ost"),
      oThis
  ;

  var colorPickerConfig =  {
        showInput: true,
        className: "color-picker",
        showInitial: true,
        showPalette: false,
        preferredFormat: "rgb",
        hideAfterPaletteSelect:true,
        change: function(color) { }
  };

  oSTNs.colorPicker = oThis = {
    defaultSelector : '.color-picker-input',

    getColorPickerConfig : function () {
      return $.extend( true ,  colorPickerConfig ) ;
    },

    initColorPricker : function (selector , config ) {
      var colorPickerConfig = config || oThis.getColorPickerConfig(),
          selector          = selector || oThis.defaultSelector,
          jElements         = $(selector),
          len               = jElements.length,  cnt ,
          jEl , val
      ;
      for( cnt = 0 ;  cnt < len ; cnt++  ){
        jEl = jElements.eq( cnt );
        val = jEl.val();
        colorPickerConfig['color'] = val;
        jEl.spectrum(colorPickerConfig);
      }
    }
  };

})(window );