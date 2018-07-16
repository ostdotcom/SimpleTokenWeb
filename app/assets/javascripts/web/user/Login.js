;
(function (window) {

    var homeNs = ns("simpletoken.home"),
        utilities = ns("simpletoken.utilities"),
        oThis;

    homeNs.login = oThis = {

        api_token_sale_state_page_names: null,
        d_token: null,
        jLoginForm: null,
        jLoginBtn : null,
        formHelper: null,
        isCaptchaValid: false,


        init: function (config) {
            $.extend(oThis , config) ;

            oThis.jLoginForm = $('#userLoginForm');
            oThis.jLoginBtn  = $('#userLogin');
            oThis.formHelper = oThis.jLoginForm.formHelper({
              success : function ( response ) {
                if (response.success == true) {
                  var data = response.data || {};
                  if ( oThis.d_token && (['verification_page', 'kyc_page'].indexOf(data.user_token_sale_state) > -1) ) {
                    window.location = '/add-kyc?t=' + oThis.d_token;
                  } else {
                    var path = oThis.get_redirect_path(data.user_token_sale_state);
                    window.location = '/' + path;
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

          oThis.jLoginBtn.off('click').on('click' , function () {
            oThis.isCaptchaValid = utilities.validateCaptcha( oThis.jLoginForm );
            //oThis.formHelper.jForm.submit();
          });

        },

        get_redirect_path: function (user_token_sale_state) {
            var data = oThis.api_token_sale_state_page_names &&
                       oThis.api_token_sale_state_page_names[user_token_sale_state];

            if (typeof(data) == 'undefined') {
                alert("Invalid user token sale state");
                return '';
            }
            return data.p;
        }


    };

})(window, jQuery);