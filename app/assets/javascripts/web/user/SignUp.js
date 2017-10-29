;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.signup = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#userSignUp").click(function (event) {
                event.preventDefault();
                var v = utilsNs.errorHandling.validationGeneric($('#userSignUpForm input[type="text"], #userSignUpForm input[type="password"]'));
                var ch = $('#userSignUpForm input[name=terms_of_service]').is(':checked');
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
                        window.location = '/add-kyc';
                        return false;
                    } else {
                        utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                },
                complete: function(){
                    $("#userSignUp")
                        .text('register')
                        .prop( "disabled", false );
                }
            });
        }
    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);