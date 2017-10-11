;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.authentication = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#adminAuthentication").click(function (event) {
        event.preventDefault();
        oThis.onSubscribe();
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
            window.location = '/admin/dashboard/';
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