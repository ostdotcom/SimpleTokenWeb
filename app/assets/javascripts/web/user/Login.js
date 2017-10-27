;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.login = oThis = {

        api_token_sale_state_page_names: null,
        d_token: null,

        init: function (config) {
            oThis.api_token_sale_state_page_names = config.api_token_sale_state_page_names;
            oThis.d_token = config.d_token;
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#userLogin").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#userLoginForm input[type="text"], #userLoginForm input[type="password"]'));
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

                        var t_prameter = '';

                        if (oThis.d_token && 'profile_page' == response.data.user_token_sale_state) {
                            t_prameter = '?t=' + oThis.d_token;
                        }
                        var path = oThis.get_redirect_path(response.data.user_token_sale_state);
                        window.location = '/' + path + t_prameter;
                        return false;
                    } else {
                        utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                },
                complete: function(){
                    $("#userLogin")
                        .text('login')
                        .prop( "disabled", false );
                }
            });
        },

        get_redirect_path: function (user_token_sale_state) {
            var path = '';

            var data = oThis.api_token_sale_state_page_names[user_token_sale_state];

            if (typeof(data) == 'undefined') {
                alert("Invalid user token sale state");
                return '';
            }
            return data.p;
        }


    };

})(window, jQuery);