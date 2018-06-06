;
(function (window) {

  var homeNs = ns("simpletoken.home"),
    oThis;

  homeNs.bt = oThis = {

      redirectLocation: '',

      init: function (config) {
          oThis.redirectLocation = config.redirect_location;



          oThis.brandedTokenForm = $('#userBtForm');
          oThis.formHelper = oThis.brandedTokenForm.formHelper({
              success : function ( response ) {
                  if (response.success == true) {
                      window.location = oThis.redirectLocation;
                      return false;
                  }
              }
          });
      }
  };

})(window, jQuery);