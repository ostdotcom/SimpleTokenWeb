;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    oThis;

  homeNs.reset = oThis = {

      init: function (config) {

          oThis.resetPasswordForm = $('#resetPasswordForm');
          oThis.formHelper = oThis.resetPasswordForm.formHelper({
              success : function ( response ) {
                if (response.success == true) {
                  oThis.showSuccess();
                  return false;
                }
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