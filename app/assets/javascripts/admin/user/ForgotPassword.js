;
(function (window) {

    var homeNs = ns("simpletokenadmin.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.forgot = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#recoverPassword").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#forgotPasswordForm input[type="text"]'));
                if (v === true) {
                  $("#recoverPassword")
                    .text('Recovering...')
                    .prop( "disabled", true );
                    oThis.forgot_password(false);
                    return false;
                }

            });

            $("#resendLink").click(function (event) {
                event.preventDefault();
                oThis.forgot_password(true);
                return false;
            });

        },

        forgot_password: function (is_resend) {
            $("#recoverPassword")
                .text('Recovering...')
                .prop( "disabled", true );
            var $form = $('#forgotPasswordForm');
            $.ajax({
                url: $form.attr('action'),
                dataType: 'json',
                method: $form.attr('method'),
                data: $form.serialize(),
                success: function (response) {
                    if (response.success == true) {
                        if (is_resend == true){
                            oThis.showSuccessMsg();
                        }
                        else {
                            oThis.showSuccessPage();
                        }

                        return false;
                    } else {
                        utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                },
                complete: function(){
                    $("#recoverPassword")
                        .text('Recover')
                        .prop( "disabled", false );
                }
            });
        },

        showSuccessPage: function () {
            var userEmail = $('#email').val();
            $('#emailSuccess').text(userEmail);
            $('#resetPassword').hide();
            $('#forgotPasswordSuccess').show();
        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);