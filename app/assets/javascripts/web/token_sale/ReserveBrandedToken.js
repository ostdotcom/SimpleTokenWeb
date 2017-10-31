;
(function (window) {
  var tsNs = ns("simpletoken.tokensale"),
      oThis;

  var FrameFactory = function ( frameFn, frameGroupId, beforeframeTime ) {
    frameGroupId = frameGroupId || "emptyFrame";
    frameIndx = FrameFactory.frameIds[frameGroupId];
    if ( !frameIndx ) {
      frameIndx = 0;
    }

    FrameFactory.frameIds[frameGroupId] = ++frameIndx;

    frameFn.frameGroupId = frameGroupId;
    frameFn.frameIndx = frameIndx;
    frameFn.frameId = frameGroupId + "_" + frameIndx;
    frameFn.frameTime = beforeframeTime || 200;
    return frameFn;
  };
  FrameFactory.frameIds = {};

  tsNs.reserveBrandedToken = oThis = {
    DEBUG: false,
    jRoot: null,
    jInput: null,
    jBtn: null,
    jSuccess: null,
    tokenNames: ["GameToken", "BikeCoin", "FitPoints"],
    frames: [],
    currentFrameIndex: 0,
    isPaused: true,
    init: function () {
      oThis.jRoot = $("#reserve-token-name-input-wrap");
      oThis.jInput = oThis.jRoot.find("#reserve-token-name-input");
      oThis.jBtn = oThis.jRoot.find("#reserve-token-name-validate-btn");
      oThis.jSuccess = oThis.jRoot.find("#reserve-token-name-success");
      oThis.buildFrames();
    },

    buildFrames: function () {
      var tokenNames = oThis.tokenNames,
          len = tokenNames.length,
          cnt = 0,
          grpId,
          btnGrpId,
          afterGrpId;

      for( ;cnt<len;cnt++) {
        grpId = "tn_" + cnt;
        emptyGrpId = "empty_" + grpId
        btnGrpId = "btn_" + grpId;
        oThis.generateEmptyFrame(emptyGrpId);
        oThis.generateTypingFrames( grpId, tokenNames[ cnt ] );
        oThis.generateButtonFrames( btnGrpId );
      }
    },
    generateEmptyFrame: function ( grpId ) {
      var frameFn = function () {
        oThis.jInput.val("");
        oThis.jBtn.removeClass("active-cls").val("CHECK").show();
        oThis.jSuccess.hide();
        oThis.playNextFrame();
      };
      oThis.frames.push( FrameFactory(frameFn, grpId, 100) );

      //Wait a while...
      oThis.generateDoNothingFrames(grpId, 2);
    },

    generateTypingFrames: function ( grpId, str ) {
      var len = str.length,
          cnt = 0,
          frameFn,
          frameStr
      ;
      for(;cnt<len;cnt++) {
        frameStr = str.substring(0, cnt+1);
        frameFn = (function ( currFrameStr ) {
          return function () {
            oThis.jInput.val( currFrameStr );
            oThis.playNextFrame();
          };
        })( frameStr );

        oThis.frames.push( FrameFactory(frameFn, grpId, 100) );
      }
    },
    generateButtonFrames: function () {
      var grpId = "btn_animation";
      
      //Set button active state.
      oThis.frames.push( FrameFactory(oThis.buttonActiveFrame, grpId, 200) );

      //Set button 'CHECKING...' text.
      oThis.frames.push( FrameFactory(oThis.buttonCheckingFrame, grpId, 200) );

      //Show Success
      oThis.frames.push( FrameFactory(oThis.successFrame, grpId, 1000) );

      //Show Last Frame
      oThis.frames.push( FrameFactory(oThis.lastFrame, grpId, 1000) );

    },
    buttonActiveFrame: function () {
      var jBtn = oThis.jBtn;
      jBtn.addClass("active-cls");
      oThis.playNextFrame();
    },
    buttonCheckingFrame: function () {
      var jBtn = oThis.jBtn;
      jBtn.removeClass("active-cls");
      jBtn.val("CHECKING...");
      oThis.playNextFrame();
    },
    successFrame: function () {
      var jBtn = oThis.jBtn,
          jSuccess = oThis.jSuccess
      ;
      jBtn.fadeOut();
      jSuccess.fadeIn( function () {
        jBtn.hide();
        jBtn.val("CHECK");  
        oThis.playNextFrame();
      });
    },
    lastFrame: function () {
      var jBtn = oThis.jBtn,
          jSuccess = oThis.jSuccess,
          jInput = oThis.jInput
      ;
      jSuccess.fadeOut();
      jBtn.fadeIn( function () {
        jSuccess.hide();
        oThis.playNextFrame();
      });
      jInput.val("");
    },
    generateDoNothingFrames: function (  grpId, noOfEmptyFrames ) {
        noOfEmptyFrames = noOfEmptyFrames || 1;
        while( noOfEmptyFrames-- ) {
          oThis.frames.push( FrameFactory( function () {
            oThis.playNextFrame();
          }, grpId, 300) );
        }
    },
    animateIfRequired: function () {
      
      var checkForPartialVisibility = true;
      if ( oThis.jInput.visible( checkForPartialVisibility ) ) {
        if ( !oThis.isPaused ) {
          return; //Already Playing.
        }
        oThis.play();
      } else {
        if ( oThis.isPaused ) { 
          return; //Already Paused.
        }
        oThis.pause();
      }
    },
    play: function () {
      oThis.isPaused = false;
      if ( oThis.DEBUG ) {
        console.log("Animation has been played");
      }
      oThis.playNextFrame();
    },
    pause: function () {
      oThis.isPaused = true;
      if ( oThis.DEBUG ) {
        console.log("Animation has been paused");
      }
    },
    playNextFrame: function () {
      if ( oThis.isPaused ) { return; }
      var currentFrameIndex = oThis.currentFrameIndex,
          frames = oThis.frames,
          frameFn
      ;

      currentFrameIndex++;
      if ( currentFrameIndex >= frames.length ) {
        currentFrameIndex = 0; /* Play from start */
      }

      frameFn = frames[ currentFrameIndex ];
      if ( oThis.DEBUG ) {
        console.log("currentFrameIndex = " + currentFrameIndex, "frames.length = " , frames.length);
        console.log("frameFn" , frameFn);
        console.log("Will play frameFn.frameId = " , frameFn.frameId , "frameFn.frameIndx =" , frameFn.frameIndx , "frameFn.frameGroupId = " , frameFn.frameGroupId);
      }
      setTimeout(frameFn, frameFn.frameTime);
      oThis.currentFrameIndex = currentFrameIndex;

    }
  };


  $(document).ready(function () {
    oThis.init();
    $(window).on("scroll", oThis.animateIfRequired);
  });

  


})(window);