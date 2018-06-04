;
(function (window) {

  var homeNs = ns("simpletoken.home"),
    oThis;

  homeNs.change = oThis = {
      jForm: null,
      formHelper : null,
      init: function (config) {
        var oThis = this;
        oThis.jForm = $('#changePasswordForm');
        oThis.formHelper= oThis.jForm.formHelper({
          success: function (response) {
            if (response.success == true) {
              $('#changePassword').hide();
              $('#changePasswordSuccess').show();
            }
          }
        });
      }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);