;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
      oThis;

  homeNs.mfa = oThis = {

    init: function () {
      oThis.mfaForm = $('#adminAuthForm');
      oThis.formHelper = oThis.mfaForm.formHelper({
        success : function ( response ) {

          if (response.success ) {
            var data = response.data,
                redirect_url = data['redirect_url'];
            window.location = redirect_url;
          }
        }
      });
    }
  };

  $(document).ready(function () {
    oThis.init();
  });

})(window);