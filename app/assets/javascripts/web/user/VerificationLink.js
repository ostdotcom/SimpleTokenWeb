;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.verification = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#resendLink").click(function (event) {
                event.preventDefault();
                oThis.resendEmail();
            });

        },

        resendEmail: function () {
            $.ajax({
                url: 'api/user/resend-double-opt-in',
                method: 'GET',
                success: function (response) {
                    if (response.success == true) {
                        alert(response.message);
                        return false;
                    } else {
                      utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                  utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                }
            });
        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);