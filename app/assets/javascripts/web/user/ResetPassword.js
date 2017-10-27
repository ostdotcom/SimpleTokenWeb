;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.reset = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#recoverPassword").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#userPasswordResetForm input[type="text"]'));
                if (v === true) {
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
            $('#successMessage').hide().text('');
            var $form = $('#userPasswordResetForm');
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
            $('#resetPasswordSuccess').show();
        },

        showSuccessMsg: function () {
            $('#successMessage').show().text('Reset Link has been sent!');
        }


    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);