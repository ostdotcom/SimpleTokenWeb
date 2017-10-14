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
                oThis.forgot_password();
              }
          });

          $("#resendLink").click(function (event) {
              event.preventDefault();
                  oThis.forgot_password();
          });

      },

      forgot_password: function () {
          var $form = $('#userPasswordResetForm');
          $.ajax({
              url: $form.attr('action'),
              dataType: 'json',
              method: $form.attr('method'),
              data: $form.serialize(),
              success: function (response) {
                  if (response.success == true) {
                      oThis.showSuccess();
                      return false;
                  } else {
                    utilsNs.errorHandling.displayFormErrors(response);
                  }
              },
              error: function (jqXHR, exception) {
                utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
              }
          });
      },

      showSuccess: function () {
         var userEmail = $('#email').val();
          $('#emailSuccess').val(userEmail);
          $('#resetPassword').hide();
          $('#resetPasswordSuccess').show();
      }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);