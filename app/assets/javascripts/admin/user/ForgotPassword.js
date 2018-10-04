;
(function (window) {

    var homeNs = ns("simpletokenadmin.home"),
        oThis;

    homeNs.forgot = oThis = {

      init: function (config) {
        oThis.jForm =  $('#forgotPasswordForm');
        oThis.formHelper = oThis.jForm.formHelper({
          success: function (response ) {
            if (response.success == true) {
                oThis.showSuccessPage();
            }
          }
        });
      },

      showSuccessPage: function () {
          $('#resetPassword').hide();
          $('#forgotPasswordSuccess').show();
      }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);