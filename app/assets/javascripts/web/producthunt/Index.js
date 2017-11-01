;
(function (window) {

    var producthuntNs = ns("simpletoken.producthunt"),
        oThis;

    producthuntNs.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

          $('.play-video-image').click(function() {
            $(this).hide();
            $(this).next('#videoFrame').attr('src', $(this).next('#videoFrame').data('src'));
            $(this).next('#videoFrame').show();
          });

        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);