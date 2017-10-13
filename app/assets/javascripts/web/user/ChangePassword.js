;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.change = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#resetBtn").click(function (event) {
              event.preventDefault();
              oThis.change_password();
          });

      },

    //TODO::initTokenSale=1 dynamic for dev
      change_password: function () {
          var $form = $('#changePasswordForm');
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