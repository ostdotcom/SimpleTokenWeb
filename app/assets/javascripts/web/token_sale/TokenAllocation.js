;
(function (window) {
  var tsNs = ns("simpletoken.tokensale"),
      oThis;
  tsNs.tokenAllocation = oThis = {
    jRoot: null,
    radialDefaults: {
      radius: 36,
      barWidth: 5,
      barBgColor: "rgba(145, 192, 173, 0.15)",
      barColor: "#6ba4aa",
      fontColor: "#6ba4aa",
      fontSize: 16,
      fontWeight: 600,
      format: "### %"
    },
    init: function () {
      var jRoot = oThis.jRoot = $("#container-token-allocation");
      jRoot.find(".token-allocation-radial").each(function ( i, el) {
        var jEl = $( el );
        oThis.buildRadial( jEl );  
      });
      
    },
    buildRadial( jEl ) {
      var data = jEl.data(),
          config = $.extend({}, oThis.radialDefaults, data)
      ;

      jEl.radialIndicator( config );
    }

  };

  $(document).ready(function () {
    oThis.init();
  });

})(window);