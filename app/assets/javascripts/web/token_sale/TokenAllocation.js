;
(function (window) {
  var tsNs = ns("simpletoken.tokensale"),
      oThis;
  tsNs.tokenAllocation = oThis = {
    jRoot: null,
    isAnimateDone: false,
    radialDefaults: {
      radius: 50,
      barWidth: 5,
      barBgColor: "rgba(145, 192, 173, 0.15)",
      barColor: "#6ba4aa",
      fontColor: "#6ba4aa",
      fontSize: 16,
      fontWeight: 600,
      percentage: true
    },
    init: function () {
      var jRoot = oThis.jRoot = $("#container-token-allocation");
      jRoot.find(".token-allocation-radial").each(function ( i, el) {
        var jEl = $( el );
        oThis.buildRadial( jEl );  
      });
      
    },
    buildRadial: function( jEl ) {
      var data = jEl.data(),
          config = $.extend({}, oThis.radialDefaults, data),
          radialValue = data.radialValue
      ;

      config.onAnimationComplete = function (val, radialObj) {
        radialObj.option("percentage", false);
        radialObj.option("format", "##%");
        radialObj.value( radialValue );
      };
      jEl.radialIndicator( config );
    },
    animateAllRadials: function() {
      oThis.jRoot.find(".token-allocation-radial").each(function ( i, el) {
        var jEl = $( el );
        oThis.animateRadial( jEl );
      });
    },
    animateRadial: function ( jEl ) {
      var data = jEl.data(),
          radialValue = data.radialValue,
          radialObj = jEl.data("radialIndicator")
      ;

      var radialObj2 = data.radialIndicator;
      radialObj.animate( radialValue );
    },
    animateIfRequired: function () {

      if ( oThis.isAnimateDone ) {
        return;
      }

      var checkForPartialVisibility = true;

      if ( oThis.jRoot.visible( checkForPartialVisibility ) ) {
        setTimeout(oThis.animateAllRadials, 500);
        oThis.isAnimateDone = true;
        $(window).off("scroll", oThis.animateIfRequired);
      }
    }

  };

  $(document).ready(function () {
    oThis.init();
  });

  $(window).on("scroll", oThis.animateIfRequired);

})(window);