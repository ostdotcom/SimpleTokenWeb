;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.login = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#adminChangePassword").click(function (event) {
        event.preventDefault();
        var v = utilsNs.errorHandling.validationGeneric( $('#adminChangePasswordForm input[type="password"]') );
        if(v === true ) {
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
            window.location = '/admin/dashboard';
            return false;
          } else {
            utilsNs.errorHandling.displayFormErrors(response);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);