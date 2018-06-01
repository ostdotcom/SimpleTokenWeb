;
(function (window , $) {

  var simpleToken =  ns("simpletoken"),
      oThis
  ;

  simpleToken.utilities = oThis =  {
    captchaErrMsg : "Please select the reCaptcha checkbox",

    validateCaptcha: function ( jForm ) {
      if( !jForm ) return false;
      if(typeof jForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
        var jElCaptchaErr =  jForm.find('.error[data-for="recaptcha"]');
        if(grecaptcha.getResponse() == ''){
          jElCaptchaErr.text(oThis.captchaErrMsg).addClass('is-invalid');
          return false;
        }else {
          jElCaptchaErr.text('').removeClass('is-invalid');
          return true;
        }
      }
    }



  }


})(window , jQuery);
