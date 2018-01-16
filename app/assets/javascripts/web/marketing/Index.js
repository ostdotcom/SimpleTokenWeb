;
(function (window) {

    var marketingNs = ns("simpletoken.marketing"),
        oThis;

    marketingNs.index = oThis = {

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

        },

        onSubscribe: function () {
            var jsonpurl = $("#subscribe-form-submit").data('jsonp');
            var email = $("#subscribe-form-email").val();

            var errors = [];

            if (email == '') {
                errors.push('Email is Mandatory!');
            }

            if (errors.length > 0) {
                oThis.showError(errors.join(' '));
                return false;
            }

            oThis.resetError();
            $("#subscribe-form-submit").prop('disabled', true);

            var attr_obj = {
                is_general_update: 1,
                is_web_after_ico: 1
            };

            var utm_params = simpletoken.utils.utmHelper.getUtmFromCookie();
            Object.assign(attr_obj, utm_params);

            $.ajax({

                url: jsonpurl,
                jsonp: "callback",
                dataType: "jsonp",
                data: {email: email, attributes: attr_obj},
                method: 'GET',
                success: function (responseJson) {
                    if ((responseJson.error != undefined) && (responseJson.error != '')) {

                        var error_msg = [];
                        $.each(responseJson.error_message, function (errors_key, errors_value) {
                            $.each(errors_value, function (index, value) {
                                error_msg.push(value);
                            });
                        });

                        oThis.showError(error_msg.join('. '));

                    } else {

                        oThis.resetError();
                        $('#subscribe-form').hide();
                        $('#subscribe-success').show();
                    }

                },
                error: function (response) {
                    oThis.showError('Something Went Wrong');
                },
                complete: function (response) {
                    $("#subscribe-form-submit").prop('disabled', false);
                }

            });
        },

        showError: function (text) {
            $('#subscribe-form .error').html(text);
            $('#subscribe-form-email').addClass('border-error');
        },

        resetError: function () {
            $('#subscribe-form .error').html('');
            $('#subscribe-form-email').removeClass('border-error');
        }


    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);