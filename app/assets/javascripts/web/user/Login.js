;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.login = oThis = {

        api_token_sale_state_page_names: null,

        init: function (config) {
            oThis.api_token_sale_state_page_names = config.api_token_sale_state_page_names;
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#userLogin").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#userLoginForm input[type="text"], #userLoginForm input[type="password"]'));
                if (v === true) {
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
                    console.log(response);
                    if (response.success == true) {
                        var path = oThis.get_redirect_path(response.data.user_token_sale_state);
                        window.location = '/' + path;
                        return false;
                    } else {
                        utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    alert(utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
                }
            });
        },

        get_redirect_path: function (user_token_sale_state) {
            var path = '';

            var data = oThis.api_token_sale_state_page_names[user_token_sale_state];

            if (typeof(data) == 'undefined'){
                alert("Invalid user token sale state");
                return '';
            }
            return data.p;
        }



};

})(window, jQuery);