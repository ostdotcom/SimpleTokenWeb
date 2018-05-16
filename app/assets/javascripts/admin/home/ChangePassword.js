;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    webUtilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.login = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#adminChangePassword").click(function (event) {
        event.preventDefault();
        var v = webUtilsNs.errorHandling.validationGeneric( $('#adminChangePasswordForm input[type="password"]') );
        if(v === true ) {
          $("#adminChangePassword")
            .text('changing password...')
            .prop( "disabled", true );
          oThis.changePassword();
        }
      });

    },

    changePassword: function () {
      var $form = $('#adminChangePasswordForm');
      $.ajax({
        url: $form.attr('action'),
        dataType: 'json',
        method: $form.attr('method'),
        data: $form.serialize(),
        success: function (response) {

          if (response.success == true) {
            webUtilsNs.errorHandling.showSuccessAlert("Password Changed Successfully");
            setTimeout(function () {
              window.location = '/admin/dashboard';
            }, 2000);
            return false;
          } else {
            webUtilsNs.errorHandling.displayFormErrors(response);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        },
        complete: function(){
          $("#adminChangePassword")
            .text('update password')
            .prop( "disabled", false );
        }
      });
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);