;
(function (window) {
    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.signup = oThis = {
        api_token_sale_state_page_names : null ,

        init: function (config) {
            $.extend(oThis , config);
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#userSignUp").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#userSignUpForm input[type="text"], #userSignUpForm input[type="password"]'));
                var ch = $('#userSignUpForm input[name=terms_of_service]').is(':checked');

                if(typeof $('#userSignUpForm').find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
                  if(grecaptcha.getResponse() == ''){
                    $('#userSignUpForm').find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
                    v = false;
                  }
                }

                if (v === true && ch == true) {
                    $("#userSignUp")
                        .text('registering...')
                        .prop( "disabled", true );
                    oThis.signup();
                }
                if (ch == false) {
                    $('.error[data-for="terms_of_service"]').text('please agree terms and privacy policy');
                }
            });

        },

        signup: function () {
            var $form = $('#userSignUpForm');
            $.ajax({
                url: $form.attr('action'),
                dataType: 'json',
                method: $form.attr('method'),
                data: $form.serialize(),
                success: function (response) {
                    if (response.success == true) {
                        var path = oThis.get_redirect_path(response.data.user_token_sale_state);
                        window.location = '/' + path;
                    } else {
                        utilsNs.errorHandling.displayFormErrors(response);
                        if(typeof grecaptcha  != 'undefined'){
                          grecaptcha.reset();
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                    if(typeof grecaptcha  != 'undefined'){
                      grecaptcha.reset();
                    }
                },
                complete: function(){
                    $("#userSignUp")
                        .text('register')
                        .prop( "disabled", false );
                }
            });
        },


        get_redirect_path: function (user_token_sale_state) {

            var data = oThis.api_token_sale_state_page_names &&
                       oThis.api_token_sale_state_page_names[user_token_sale_state];

            if (typeof(data) == 'undefined') {
                alert("Invalid user token sale state");
                return '';
            }
            return data.p;
        }
    };


})(window);