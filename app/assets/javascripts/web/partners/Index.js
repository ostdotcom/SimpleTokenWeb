;
(function (window) {

  var partnersNs = ns("simpletoken.partners"),
      oThis;

  partnersNs.index = oThis = {

      init: function (config) {
          oThis.bindButtonActions();
      },

      bindButtonActions: function () {

        $("#partners-contact-us-submit").on("click", function (event) {
          event.preventDefault();
          oThis.onSendMessage();
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
        var contactusurl = $("#partners-contact-us").prop('action');

        $("#partners-contact-us-submit").prop('disabled', true);

        $.ajax({

          url: contactusurl,
          data: {},
          method: 'POST',
          success: function (responseJson) {
            if () {


            } else {

            }

          },
          error: function (response) {
          },
          complete: function (response) {
          }

        });
      }

  };

  $(document).ready(function () {
      oThis.init({i18n: {}});
  });

})(window);