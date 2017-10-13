;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.signup = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#userSignUp").click(function (event) {
              event.preventDefault();
              var v = simpletoken.utils.errorHandling.validationGeneric( $('#userSignUpForm input[type="text"], #userSignUpForm input[type="password"]') );
              if(v === true && $('#userSignUpForm input[name=terms_of_service]').is(':checked') == true) {
                  oThis.signup();
              } else {
                  $('.error[data-for="terms_of_service"]').text('please agree terms and privacy policy');
              }
          });

      },

      signup: function () {
          var $form = $('#userSignUpForm');
          $.ajax({
              url: $form.attr('action'),
              dataType: 'json',
              method: $form.attr('method'),
              data: $form.serialize(),
              success: function (response) {
                  console.log(response);
                  if (response.success == true) {
                      window.location = '/update-kyc';
                      return false;
                  } else {
                    simpletoken.utils.errorHandling.displayFormErrors(response);
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