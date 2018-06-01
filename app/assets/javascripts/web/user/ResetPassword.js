;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

    homeNs.reset = oThis = {
        jForm: null,
        formHelper : null,

        init: function (config) {
          var oThis = this;
          oThis.jForm = $('#userPasswordResetForm');
          oThis.formHelper= oThis.jForm.formHelper({
            success: function (response) {
              if (response.success == true) {
                if (is_resend == true){
                  oThis.showSuccessMsg();
                }
                else {
                  oThis.showSuccessPage();
                }
              }
            }
          });
        },

        bindButtonActions: function () {

            $("#resendLink").click(function (event) {
                event.preventDefault();
                oThis.forgot_password(true);
                return false;
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