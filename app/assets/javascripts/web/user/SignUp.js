;
(function (window) {
    var homeNs = ns("simpletoken.home"),
        utilities = ns("simpletoken.utilities"),
        oThis;

    homeNs.signup = oThis = {
        api_token_sale_state_page_names : null ,

        init: function (config) {
            $.extend(oThis , config);

            oThis.jSignupForm = $('#userSignUpForm');
            oThis.jSignBtn  = $('#userSignUp');
            oThis.formHelper = oThis.jSignupForm.formHelper({
                success : function ( response ) {
                    if (response.success == true) {
                        var path = oThis.get_redirect_path(response.data.user_token_sale_state);
                        window.location = '/' + path;
                    }
                },
                complete: function ( response ) {
                    if(typeof grecaptcha  != 'undefined'){
                        grecaptcha.reset();
                    }
                    $("#userSignUp")
                        .text('register')
                        .prop( "disabled", false );
                }
            });

            oThis.bindButtonActions();
        },

        bindButtonActions: function () {




            oThis.jSignupForm.on("beforeSubmit", function (event) {
                if ( !oThis.isCaptchaValid ) {
                    event.preventDefault();
                }
            });

            oThis.jSignBtn.off('click').on('click' , function () {
                oThis.isCaptchaValid = utilities.validateCaptcha( oThis.jSignupForm );
                oThis.formHelper.jForm.submit();
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