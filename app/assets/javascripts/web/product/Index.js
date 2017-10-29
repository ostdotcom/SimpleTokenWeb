;
(function (window) {

    var homeNs = ns("simpletoken.product"),
        oThis;

    homeNs.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $('.part-wrapper').click(function(){
                oThis.partClick(this);
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

    };

    $(document).ready(function () {
        oThis.init();
    });

})(window);