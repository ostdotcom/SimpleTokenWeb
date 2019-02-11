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
                next = new URL(location.href).searchParams.get("next"),
                qS = next ? "?next=" + encodeURIComponent(next)  : "",
                redirect_url = data['redirect_url'] + qS;
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