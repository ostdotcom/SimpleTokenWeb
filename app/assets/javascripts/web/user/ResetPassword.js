;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.reset = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#recoverPassword").click(function (event) {
              event.preventDefault();
              oThis.forgot_password();
          });

      },

    //TODO::initTokenSale=1 dynamic for dev
      forgot_password: function () {
          var $form = $('#userPasswordResetForm');
          $.ajax({
              url: $form.attr('action'),
              dataType: 'json',
              method: $form.attr('method'),
              data: $form.serialize(),
              success: function (response) {
                  console.log(response);
                  if (response.success == true) {
                      alert("success");
                      return false;
                  } else {
                      alert(response.err.display_text);
                  }
              },
              error: function (jqXHR, exception) {
                  alert(utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
              }
          });
      }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);