;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.bt = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#btSubmit").click(function (event) {
              event.preventDefault();
              oThis.submit(false);
          });

          $("#btSkip").click(function (event) {
              event.preventDefault();
              oThis.submit(true);
          });

      },

      submit: function (skip_name) {
          var $form = $('#userBtForm');
          data = $form.serialize();
          data += "&skip_name=" + skip_name;

          $.ajax({
              url: $form.attr('action'),
              dataType: 'json',
              method: $form.attr('method'),
              data: data,
              success: function (response) {
                  if (response.success == true) {
                      window.location = '/verification-link';
                      return false;
                  } else {
                    utilsNs.errorHandling.displayFormErrors(response);
                  }
              },
              error: function (jqXHR, exception) {
                utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
              }
          });
      }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);