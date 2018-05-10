;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.reset = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#resetBtn").click(function (event) {
              event.preventDefault();
              var v = utilsNs.errorHandling.validationGeneric($('#resetPasswordForm input[type="text"], #resetPasswordForm input[type="password"]'));
              if (v === true) {
                  $("#resetBtn")
                      .text('setting password...')
                      .prop( "disabled", true );
                  oThis.change_password();
              }
          });

      },

      change_password: function () {
          var $form = $('#resetPasswordForm');
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
              },
              complete: function(){
                  $("#resetBtn")
                      .text('update password')
                      .prop( "disabled", false );
              }
          });
      },

      showSuccess: function () {
          $('#resetPassword').hide();
          $('#resetPasswordSuccess').show();
      }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);