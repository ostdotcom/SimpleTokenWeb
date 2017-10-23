;
(function (window) {

  var aboutNs = ns("simpletoken.about"),
    oThis;

  aboutNs.index = oThis = {

    init: function (config) {
        oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      oThis.stickyNav();
    },

    stickyNav: function(){
      var navContainer =  $('.container-about-nav');
      var navOffset = navContainer.offset().top;
      navContainer.wrap('<div class="nav-placeholder"></div>');
      $('.nav-placeholder').height(navContainer.outerHeight());

      $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();
        if(scrollPos >= navOffset){
          $('.container-about-nav').addClass("sticky");
        } else{
          $('.container-about-nav').removeClass("sticky");
        }
      });
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);