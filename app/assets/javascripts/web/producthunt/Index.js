;
(function (window) {

    var producthuntNs = ns("simpletoken.producthunt"),
        oThis;

    producthuntNs.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

          $("#subscribe-form-submit").on("click", function (event) {
              event.preventDefault();
              oThis.onSubscribe();
          });

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