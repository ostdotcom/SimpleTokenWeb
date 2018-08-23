;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
      oThis;

  homeNs.activate = oThis = {

      jForm : $('#activateAccountPasswordForm'),
      formHelper : null ,

      init: function (config) {
        oThis.formHelper =  oThis.jForm.formHelper({
          success: function (response) {
            if( response.success  ){
              oThis.showSuccess();
            }
          }
        });
      },

      showSuccess: function () {
          $('#activateAccountPassword').hide();
          $('#activateAccountPasswordSuccess').show();
      }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);