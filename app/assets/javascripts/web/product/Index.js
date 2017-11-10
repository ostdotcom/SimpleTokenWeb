;
(function (window) {

    var homeNs = ns("simpletoken.product"),
        oThis;

    homeNs.index = oThis = {

        isMobile: false,

        init: function (config) {
            oThis.bindButtonActions();
            oThis.onResize();
        },

        bindButtonActions: function () {

            $('.part-wrapper').click(function(){
                oThis.partClick(this);
            });

            $(".smooth-scroll").on('click', function (event) {
              if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                  scrollTop: $(hash).offset().top
                }, 800);
              }
            });

        },

        partClick: function(elem){

            var part = $(elem).data('part');
            var $partDescription = $('.part-description');
            var currentPartNum = $('.part-wrapper.active').data('partnum');
            var newPartNum = $('[data-part="'+part+'"]').data('partnum');
            $('.part-wrapper').removeClass('active');
            $(elem).addClass('active');

            $partDescription.find('.part-content').hide();
            $partDescription.find('.part-content[data-part="'+part+'"]').fadeIn('fast');
        },

        onResize: function(){

            if($(window).width() > 760){
                oThis.isMobile = false;
                var maxGHHeight = Math.max(
                    $('.github p').eq(0).height(),
                    $('.github p').eq(1).height(),
                    $('.github p').eq(2).height()
                );
                $('.github p').each(function(){
                    if($(this).height() < maxGHHeight){
                        $(this).height(maxGHHeight);
                    }
                });
            } else {
                oThis.isMobile = true;
            }
        }

    };

    $(document).ready(function () {
        oThis.init();
    });

    $(window).resize(function () {
        oThis.onResize();
    });

})(window);