;
(function (window) {

    var stickyheaderNs = ns("simpletoken.stickyheader")
      , oThis
      , containerSelector = ".container-sticky-nav"
      , pseudoDomSelector = ".nav-placeholder"
      , jContainer        = null
      , jPseudo           = null
      , containerHeight   = 0
      , navOffset         = 0
    ;

    stickyheaderNs.index = oThis = {

      init: function (config) {
        jContainer =  $( containerSelector );
        jPseudo = $('<div class="' + pseudoDomSelector + '"></div>');
        jPseudo.hide();
        jContainer.before( jPseudo );
        oThis.setContainerHeight();
        oThis.bindButtonActions();
      },

      bindButtonActions: function () {
        var scrollLink  = jContainer.find('.scroll');

        $(window).scroll(function(){
          oThis.adjustStickiness();
          oThis.adjustScrollLinks();
        });

        $(window).resize(function(){
          oThis.setContainerHeight();
          oThis.adjustStickiness();
          oThis.adjustScrollLinks();
        });

        // Smooth scrolling
        scrollLink.on('click', function(event) {
          var element = this;
          oThis.onScrollLinkClicked( event, element);
        });
      },

      setContainerHeight: function () {
        containerHeight = jContainer.outerHeight();
        jPseudo.height( containerHeight );
        if ( jContainer.hasClass( "nav-sticky" ) ) {
          navOffset = Math.ceil( jPseudo.offset().top );
        } else  {
          navOffset = Math.ceil( jContainer.offset().top );
        }

        console.log("setContainerHeight", "\n\tnavOffset", navOffset, "\n\tcontainerHeight", containerHeight);
      },

      adjustStickiness: function () {
        var winScrollPos  = $( window ).scrollTop();
        console.log("adjustStickiness", "\n\twinScrollPos", winScrollPos, "\n\tnavOffset", navOffset, "\n\tcontainerHeight", containerHeight);
        if(winScrollPos >= navOffset){
          jContainer.addClass("nav-sticky");
          jPseudo.show();
        } else{
          jContainer.removeClass("nav-sticky");
          jPseudo.hide();
        }
        if(navOffset < winScrollPos){
          jContainer.find('.nav-item').removeClass('active');
        }
      },

      adjustScrollLinks: function () {
        var winScrollPos  = $( window ).scrollTop()
          , scrollLink    = jContainer.find('.scroll')
        ;
        scrollLink.each(function() {
          if (this.hash === "") {
            return; /* Do Nothing */
          }

          var hash = this.hash
            , finalOffset
          ;

          finalOffset = oThis.getFinalOffsetForHash( hash );
          if ( finalOffset <= winScrollPos ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
      },

      onScrollLinkClicked: function ( event, element ) {
        if (this.hash === "") {
          return; /* Do Nothing */
        }
        event.preventDefault();

        var hash = element.hash
          , finalOffset = oThis.getFinalOffsetForHash( hash )
        ;

        $('html, body').animate({
          scrollTop: finalOffset
        }, 800);

      },

      getFinalOffsetForHash: function ( hash ) {
        var jHash = $(hash)
          , sectionOffset
        ;
        if ( !jHash.length ) {
          return Number.MAX_VALUE;
        }

        sectionOffset = $(hash).offset().top;
        return Math.ceil( sectionOffset - containerHeight );
      }

    };

    //$(document).ready(function () {
  console.log("userAgent", navigator.userAgent);
  if ( /Safari/i.test(navigator.userAgent) && ! ( /Chrome/i.test(navigator.userAgent) ) ) {
    //Use window load for Safari.
    $(window).load(function () {
      oThis.init({i18n: {}});
    });
  } else {
    //Use document ready.
    $( document ).ready(function () {
      oThis.init({i18n: {}});
    })
  }

})(window);