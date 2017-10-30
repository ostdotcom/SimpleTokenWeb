;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        oThis;

    homeNs.index = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#subscribe-form-submit").on("click", function (event) {
                event.preventDefault();
                oThis.onSubscribe();
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

        onSubscribe: function () {
            var jsonpurl = $("#subscribe-form-submit").data('jsonp');
            var email = $("#subscribe-form-email").val();

            var attr_obj = {};
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
                is_token_sale_user: 1
            };

            var utm_params = oThis.getUtmFromCookie();
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

        getUtmFromCookie: function () {
            var name = "st_utm=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return oThis.getUtmObjFromString(c.substring(name.length, c.length));
                }
            }
            return {};
        },


        getUtmObjFromString: function (utm_string) {
            var utm_keys = ['origin_page', 'utm_campaign', 'utm_content', 'utm_medium', 'utm_source', 'utm_term', 'utm_type']

            var utm_parameters = {};
            var str = '';
            var key_str = '';
            var val_str = '';

            var quote_count = 0;

            for (var i = 0; i < utm_string.length; i++) {
                var c = utm_string.charAt(i);

                if (c == '"') {
                    if (quote_count > 0 && (utm_string.charAt(i - 1) == '\\')) {
                        str = str + c;

                    } else {
                        quote_count = quote_count + 1;

                        if (quote_count == 2) {
                            key_str = str;
                        }
                        if (quote_count == 4) {
                            val_str = str;
                            if ((utm_keys.indexOf(key_str) > -1) && (val_str != '')) {
                                utm_parameters[key_str] = val_str;
                            }
                            key_str = '';
                            val_str = '';
                            quote_count = 0;
                        }

                        str = '';
                    }
                }
                else {
                    if (quote_count != 0) {
                        str = str + c;
                    }
                }
            }
            return utm_parameters;

        },

        showError: function (text) {
            $('#subscribe-form .error').html(text);
            $('#subscribe-form-email').addClass('red');
        },

        resetError: function () {
            $('#subscribe-form .error').html('');
            $('#subscribe-form-email').removeClass('red');
        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);