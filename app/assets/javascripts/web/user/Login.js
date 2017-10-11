;
(function (window) {

  var homeNs = ns("simpletoken.home"),
    oThis;

  homeNs.login = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#userLogin").click(function (event) {
              event.preventDefault();
              oThis.login();
          });

      },

    //TODO::initTokenSale=1 dynamic for dev
      login: function () {
          var $form = $('#userLoginForm');
          $.ajax({
              url: $form.attr('action'),
              dataType: 'json',
              method: $form.attr('method'),
              data: $form.serialize(),
              success: function (response) {
                  console.log(response);
                  if (response.success == true) {
                      window.location = '/update-kyc?initTokenSale=1';
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