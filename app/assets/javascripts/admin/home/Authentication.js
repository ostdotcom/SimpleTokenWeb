;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.authentication = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#adminAuthentication").click(function (event) {
        event.preventDefault();
        var v = utilsNs.errorHandling.validationGeneric($('#adminAuthForm input[type="text"]'));
        if (v === true) {
          $("#adminAuthentication")
            .text('submitting...')
            .prop( "disabled", true );
          oThis.onSubscribe();
        }
      });

    },

    onSubscribe: function () {
      var $form = $('#adminAuthForm');
      $.ajax({
        url: $form.attr('action'),
        dataType: 'json',
        method: $form.attr('method'),
        data: $form.serialize(),
        success: function (response) {
          if (response.success == true) {
            window.location = '/admin/dashboard';
            return false;
          } else {
            utilsNs.errorHandling.displayFormErrors(response);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        },
        complete: function(){
          $("#adminAuthentication")
            .text('submit')
            .prop( "disabled", false );
        }
      });
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);