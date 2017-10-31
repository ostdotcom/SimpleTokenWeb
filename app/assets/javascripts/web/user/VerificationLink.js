;
(function (window) {

    var verificationNs = ns("simpletoken.verification"),
        utilsNs = ns("simpletoken.utils"),
        oThis;

      verificationNs.home = oThis = {


        init: function (config) {
           if (config.e_t == 1){
             oThis.onload();
           }
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#resendLink, .resendLink").click(function (event) {
                event.preventDefault();
                var newURL = location.href.split("?")[0];
                window.history.replaceState({}, document.title, newURL);
                oThis.resendEmail();
                $('#verifyLinkModal').modal('hide');
            });

        },

        resendEmail: function () {
          $('#successMessage').text('');
            $.ajax({
                url: 'api/user/resend-double-opt-in',
                method: 'GET',
                success: function (response) {
                    if (response.success == true) {
                      $('#successMessage').show().text('Activation email has been sent!');
                        return false;
                    } else {
                      utilsNs.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                  utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
                }
            });
        },

        onload: function(){
          $('#verifyLinkModal').modal('show');
        }

    };
})(window);