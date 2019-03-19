;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
      oThis;

  homeNs.mfa = oThis = {

    init: function (config) {
      $.extend(oThis , config) ;
      new QRCode($('.qr-image')[0], oThis.qr_code_string);
      var formHelperGetData = FormHelper.prototype.getSerializedData  ;


      oThis.mfaForm = $('#adminAuthForm');
      oThis.formHelper = oThis.mfaForm.formHelper({
        getSerializedData : function(){
          var data = formHelperGetData.apply(this),
            urlParams = new URLSearchParams(window.location.search),
            next = urlParams.get('next');
            if (next){
                data.push({
                    name: "next_url",
                    value: encodeURIComponent(next)
                });
            }
            return data;
        },
        success : function ( response ) {

          if (response.success ) {
            var data = response.data,
                redirect_url = data['redirect_url'];
            window.location = redirect_url;
          }
        }
      });
    }
  };

})(window);