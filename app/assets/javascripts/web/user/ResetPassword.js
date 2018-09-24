;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilities = ns("simpletoken.utilities"),
        oThis;

    homeNs.reset = oThis = {
        jForm: null,
        formHelper : null,

        init: function ( ) {
          var oThis = this;
          oThis.jForm = $('#userPasswordResetForm');
          oThis.formHelper= oThis.jForm.formHelper({
            success: function (response) {
              if (response.success == true) {
                  oThis.showSuccessPage();

              }else {
                oThis.formHelper.showServerErrors( response );
              }
            },
            error: function ( error ) {
              oThis.formHelper.showServerErrors( error );
            },
            complete: function () {
              var jRecoverBtn = $("#recoverPassword");
              jRecoverBtn.text(jRecoverBtn.attr('title')).prop( "disabled", false );
            }
          });

          oThis.bindButtonActions();
        },

        bindButtonActions: function () {
        },

        showSuccessPage: function () {
            $('#resetPassword').hide();
            $('#resetPasswordSuccess').show();
        }

    };

    $(document).ready(function () {
        oThis.init({i18n: {}});
    });

})(window);