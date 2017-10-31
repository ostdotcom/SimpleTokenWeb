;
(function (window) {

  var stickyheaderNs = ns("simpletoken.stickyheader"),
    oThis;

  stickyheaderNs.index = oThis = {

    init: function (config) {
        oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      oThis.stickyNav();


      var scrollLink = $('.scroll');
      // Smooth scrolling
      scrollLink.on('click', function(e) {
        if (this.hash !== "") {
          e.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800);
        }
      });

      $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 20;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        })

      })

    },

    stickyNav: function(){
      oThis.onResize();
      var navOffset = $('.container-about-nav').offset().top;
      $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();
        if(scrollPos >= navOffset){
          $('.container-about-nav').addClass("nav-sticky");
        } else{
          $('.container-about-nav').removeClass("nav-sticky");
        };
      });
    },

    onResize: function(){
        var navContainer =  $('.container-about-nav');
        navContainer.wrap('<div class="nav-placeholder"></div>');
        $('.nav-placeholder').height(navContainer.outerHeight());
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

  $(window).resize(function(){
    oThis.onResize();
  });

})(window);