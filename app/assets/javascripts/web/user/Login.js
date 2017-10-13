;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.login = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#userLogin").click(function (event) {
                event.preventDefault();
                oThis.login();
            });

        },

        //TODO::initTokenSale=1 dynamic for dev
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
                        window.location = '/' + path + '?initTokenSale=1';
                        return false;
                    } else {
                        alert(response.err.display_text);
                    }
                },
                error: function (jqXHR, exception) {
                    alert(utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
                }
            });
        },

        get_redirect_path: function (user_token_sale_state) {
            var path = '';

            switch (user_token_sale_state) {
                case 'profile_page':
                    path = "dashboard";
                    break;
                case 'verification_page':
                    path = "verification-link";
                    break;
                case 'bt_page':
                    path = "reserve-token";
                    break;
                case 'kyc_page':
                    path = "update-kyc";
                    break;
                default:
                    alert("Invalid user token sale state");
            }

            return path;

        }
    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);