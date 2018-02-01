;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.login = oThis = {

    jLoginForm: null,

    init: function (config) {
      oThis.bindButtonActions();
      oThis.jLoginForm = $('#adminLoginForm');
    },

    bindButtonActions: function () {

      $("#adminLogin").click(function (event) {
        event.preventDefault();
        var v = utilsNs.errorHandling.validationGeneric( $('#adminLoginForm input[type="text"], #adminLoginForm input[type="password"]') );

        if(typeof $('#jLoginForm').find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
          if(grecaptcha.getResponse() == ''){
            $('#jLoginForm').find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
            v = false;
          }
        }

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
          if (response.success == true) {
            window.location = '/admin/authentication';
            return false;
          } else {
            utilsNs.errorHandling.displayFormErrors(response);
            if(typeof grecaptcha  != 'undefined'){
              grecaptcha.reset();
            }
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
          if(typeof grecaptcha  != 'undefined'){
            grecaptcha.reset();
          }
        }
      });
    }
  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);