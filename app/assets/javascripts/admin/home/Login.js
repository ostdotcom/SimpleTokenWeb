;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    utilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.login = oThis = {

    init: function (config) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {

      $("#adminLogin").click(function (event) {
        event.preventDefault();
        oThis.onSubscribe();
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