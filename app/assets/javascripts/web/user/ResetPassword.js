;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilities = ns("simpletoken.utilities"),
        oThis;

    homeNs.reset = oThis = {
        jForm: null,
        formHelper : null,
        is_resend : false,

        init: function ( ) {
          var oThis = this;
          oThis.jForm = $('#userPasswordResetForm');
          oThis.formHelper= oThis.jForm.formHelper({
            success: function (response) {
              if (response.success == true) {
                if (oThis.is_resend){
                  oThis.showSuccessMsg();
                }
                else {
                  oThis.showSuccessPage();
                }
              }else {
                oThis.formHelper.showServerErrors( response );
              }
            },
            error: function ( error ) {
              oThis.formHelper.showServerErrors( error );
            },
            complete: function () {
              var jRecoverBtn = $("#recoverPassword"),
                  jResendBtn = $("#resendLink")
              ;
              jRecoverBtn.text(jRecoverBtn.attr('title')).prop( "disabled", false );
              jResendBtn.text(jResendBtn.attr('title')).prop( "disabled", false );
            }
          });

          oThis.bindButtonActions();
        },

        bindButtonActions: function () {
            $("#resendLink").click(function () {
              $(this).text($(this).data('submiting')).prop( "disabled", true );
              oThis.is_resend =  true;
              oThis.formHelper.jForm.submit();
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