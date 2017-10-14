;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.login = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#adminLogin").click(function (event) {
        event.preventDefault();
        var v = utilsNs.errorHandling.validationGeneric( $('#adminLoginForm input[type="text"], #adminLoginForm input[type="password"]') );
        if(v === true ) {
          oThis.onSubscribe();
        }
      });

    },

    onSubscribe: function () {
      var $form = $('#adminLoginForm');
      $.ajax({
        url: $form.attr('action'),
        dataType: 'json',
        method: $form.attr('method'),
        data: $form.serialize(),
        success: function (response) {
          console.log(response);
          if (response.success == true) {
            window.location = '/admin/authentication';
            return false;
          } else {
            utilsNs.errorHandling.displayFormErrors(response);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);