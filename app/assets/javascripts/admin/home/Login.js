;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    utilities = ns("simpletoken.utilities"),

      oThis;

  homeNs.login = oThis = {

    jLoginForm: null,

    init: function (config) {

      oThis.jLoginForm = $('#adminLoginForm');
      oThis.jLogin = $('#adminLogin');
        oThis.formHelper = oThis.jLoginForm.formHelper({
            success : function ( response ) {
                    if (response.success == true) {
                        window.location = '/admin/authentication';
                        return false;
                    } else {
                        if (response.err && response.err.code === "is_deleted" ){
                            oThis.showDeactivated();
                        }
                }
            },
            complete: function ( response ) {
                if(typeof grecaptcha  != 'undefined'){
                    grecaptcha.reset();
                }

            }
        });
        oThis.bindButtonActions();

    },

    bindButtonActions: function () {
        oThis.jLoginForm.on("beforeSubmit", function (event) {
            if ( !oThis.isCaptchaValid ) {
                event.preventDefault();
            }
        });

        oThis.jLogin.off('click').on('click' , function () {
            oThis.isCaptchaValid = utilities.validateCaptcha( oThis.jLoginForm );
            oThis.formHelper.jForm.submit();
        });
    },



    showDeactivated: function () {
      $('#loginForm').hide();
      $('#accountDeactivated').show();
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);