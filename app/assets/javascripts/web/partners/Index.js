;
(function (window) {

  var partnersNs = ns("simpletoken.partners"),
      utilsNs = ns("simpletoken.utils"),
      oThis;

  partnersNs.index = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

        $("#partners-contact-us-submit").on("click", function (event) {
          event.preventDefault();
          var v = utilsNs.errorHandling.validationGeneric($('#partners-contact-us input[type="text"], #partners-contact-us input[type="password"], #partners-contact-us input[type="number"]'));
          if (v === true) {
            $("#partners-contact-us-submit")
              .text('sending ...')
              .prop( "disabled", true );
            oThis.onSendMessage();
          }
        });

        $(".smooth-scroll").on('click', function (event) {
          if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
          }
        });

      },

      onSendMessage: function () {
        var $contactusform = $('#partners-contact-us-form');
        var $contactusformurl = $contactusform.prop('action');

        $.ajax({
          url: $contactusformurl,
          dataType: 'json',
          method: 'POST',
          data: $contactusform.serialize(),
          success: function (response) {
            if (response.success == true) {

              alert('success message');

            } else {

              alert('null');

            }

          },
          error: function (jqXHR, exception) {
            utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
          },

          complete: function (response) {
            $("#partners-contact-us-submit").prop('disabled', false);
          }

        });
      }

  };

  $(document).ready(function () {
      oThis.init({i18n: {}});
  });

})(window);