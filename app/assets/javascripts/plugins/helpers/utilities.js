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
    },

      showSuccessAlert: function (msg, intervals) {

          var settings = $.extend({}, {show: 1000, hide: 1000, stay: 4000}, intervals);
          var uts = Date.now();

          $('<div id="simpletoken-alert-' + uts + '" class="simpletoken-alert text-center"><span class="icon ver-middle"></span><span class="msg ver-middle"></span></div>').appendTo('#banner-content');

          var $simpletokenAlert = $('#simpletoken-alert-' + uts);
          var $simpletokenAlertIcon = $('#simpletoken-alert-' + uts + ' .icon');


          $simpletokenAlert.addClass('success');
          $simpletokenAlertIcon.addClass('success-tick-white-icon');

          $('#simpletoken-alert-' + uts + ' .msg').html(msg);

          if ($(window).scrollTop() >= 50) {
              $simpletokenAlert.css({
                  position: 'fixed',
                  top: 0
              });
          } else {
              $simpletokenAlert.css({
                  position: 'absolute',
                  top: '0'
              });
          }

          $simpletokenAlert.show().animate({
              opacity: '1'
          }, settings.show, function () {
              setTimeout(function () {
                  $simpletokenAlert.animate({
                          opacity: '0'
                      },
                      settings.hide,
                      'swing',
                      function () {
                          $(this).remove();
                      });
              }, settings.stay);
          });

      }



  }


})(window , jQuery);
