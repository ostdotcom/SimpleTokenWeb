;
(function (window ) {

  var oSTNs           = ns("ost"),
      defaultColor    = "#fff",
      oThis
  ;

  var colorPickerConfig =  {
        showInput: true,
        className: "color-picker",
        showInitial: true,
        showPalette: false,
        preferredFormat: "hex",
        hideAfterPaletteSelect:true,
        change: function(color) {
          oThis.setValue( $(this) );
        }
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
          jSpectrum , rgbVal ,
          jEl , val
      ;
      for( cnt = 0 ;  cnt < len ; cnt++  ){
        jEl = jElements.eq( cnt );
        val = jEl.val() || defaultColor;
        colorPickerConfig['color'] = val;
        jEl.spectrum(colorPickerConfig);
        oThis.setValue( jEl );
      }
    } ,

    setValue : function ( jEl ) {
      var jSpectrum =  jEl.spectrum("get"),
          rgbVal    = jSpectrum.toRgbString()
      ;
      jEl.val( rgbVal );
    }
  };

})(window );