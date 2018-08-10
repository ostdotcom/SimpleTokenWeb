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
      return $.extend( true ,  colorPickerConfig ) ;
    }
  };

  $.fn.extend({
    initColorPricker : function ( config ) {
      var colorPickerConfig = config || oThis.getColorPickerConfig(),
          len = $(this).length,  cnt ,
          jEl , val
      ;
      for( cnt = 0 ;  cnt < len ; cnt++  ){
        jEl = $(this).eq( cnt );
        val = jEl.val();
        colorPickerConfig['color'] = val;
        jEl.spectrum(colorPickerConfig);
      }
    }
  });

})(window );