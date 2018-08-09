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

    getColorPickerConfig : function () {
      return colorPickerConfig;
    } ,

    initColorPicker : function ( selector , config ) {
      if(!selector) return ;
      var colorPickerConfig = config || oThis.getColorPickerConfig(),
          jEl = $(selector),
          val = jEl.val()
      ;
      colorPickerConfig['color'] = val;
      jEl.spectrum(colorPickerConfig);
    }
  };

})(window );