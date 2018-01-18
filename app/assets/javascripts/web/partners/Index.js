;
(function (window) {

    var partnersNs = ns("simpletoken.partners"),
        oThis;

    partnersNs.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $(".smooth-scroll").on('click', function (event) {
                if (this.hash !== "") {
                    event.preventDefault();
                    var hash = this.hash;
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 800);
                }
            });

        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);