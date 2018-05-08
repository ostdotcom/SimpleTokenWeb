;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.login = oThis = {

        api_token_sale_state_page_names: null,
        d_token: null,

        init: function (config) {
            $.extend(oThis , config) ;
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#userLogin").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#userLoginForm input[type="text"], #userLoginForm input[type="password"]'));

                if(typeof $('#userLoginForm').find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
                  if(grecaptcha.getResponse() == ''){
                    $('#userLoginForm').find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
                    v = false;
                  }
                }

                if (v === true) {
                    $("#userLogin")
                        .text('logging in...')
                        .prop( "disabled", true );
                    oThis.login();
                }
            });

        },

        login: function () {
            var $form = $('#userLoginForm');
            $.ajax({
                url: $form.attr('action'),
                dataType: 'json',
                method: $form.attr('method'),
                data: $form.serialize(),
                success: function (response) {
                    if (response.success == true) {
                        var data = response.data || {};

                        if ( oThis.d_token && (['verification_page', 'kyc_page'].indexOf(data.user_token_sale_state) > -1) ) {
                            window.location = '/add-kyc?t=' + oThis.d_token;
                        } else {
                            var path = oThis.get_redirect_path(data.user_token_sale_state);
                            window.location = '/' + path;
                        }

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
                    $("#userLogin")
                        .text('login')
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

})(window, jQuery);