;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

          $("#kycSubmit").click(function (event) {
              event.preventDefault();
              var v = oThis.validate();
              if(v === true) {oThis.submit();}
          });

          $("#verify-modal-btn").on('click', function () {
            $('#verifyModal').modal('show').css('overflow-y', 'hidden');
          });

      },

      validate: function(){
        var $fields = $('#kycForm input[type="text"]');
        var error_count = 0;
        $.each($fields, function(key, field){
          if($(field).val() == ''){
            var name = $(field).attr('name');
            $('.error[data-for="'+name+'"]').text(name+' is required');
            error_count++;
          }
        });
        if(error_count === 0) {return true;}
        return false;
      },

    //TODO::initTokenSale=1 dynamic for dev
      submit: function () {
          var $form = $('#kycForm');
          simpletoken.utils.errorHandling.clearFormErrors();
          $.ajax({
              url: $form.attr('action'),
              dataType: 'json',
              method: $form.attr('method'),
              data: $form.serialize(),
              success: function (response) {
                  console.log(response);
                  if (response.success == true) {
                      window.location = '/reserve-token?initTokenSale=1';
                      return false;
                  } else {
                      simpletoken.utils.errorHandling.displayFormErrors(response);
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