;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
      utilities = ns("simpletoken.utilities"),
      oThis;

  homeNs.login = oThis = {

    init: function (config) {
        oThis.changePasswordForm = $('#adminChangePasswordForm');
        oThis.formHelper = oThis.changePasswordForm.formHelper({
            success : function ( response ) {
                if (response.success == true) {
                    utilities.showSuccessAlert("Password Changed Successfully");
                    setTimeout(function () {
                        window.location = '/admin/dashboard';
                    }, 2000);
                    return false;
                }
            }
        });
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);