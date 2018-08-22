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
      var configCopy = {} ;
      $.extend( true , configCopy ,  colorPickerConfig ) ;
      return configCopy ;
    },

    initColorPricker : function (selector , config ) {
      if( !selector ) return ;
      var colorPickerConfig = oThis.getColorPickerConfig(),
          jElements         = $(selector),
          len               = jElements.length,  cnt ,
          jSpectrum , rgbVal ,
          jEl , val
      ;
      if ( config && typeof config === "object") {
        $.extend( colorPickerConfig , config );
      }

      for( cnt = 0 ;  cnt < len ; cnt++  ){
        jEl = jElements.eq( cnt );
        val = jEl.val() || defaultColor;
        colorPickerConfig['color'] = val;
        jEl.spectrum( colorPickerConfig );
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