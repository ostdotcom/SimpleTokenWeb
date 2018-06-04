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
        var jElCaptchaErr =  jForm.find('.error[data-forid="recaptcha"]');
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
    },

    displayAjaxError: function(response, jParent) {
      if ( !jParent ) {
        jParent = $("body");
      }
      if((response.success === false) || (response.err != undefined && response.err != '')){
        var jErrEl = jParent.find('.general_error');
        if( jErrEl.length > 0 ){
          jErrEl.text(response.err.display_text);
        } else {
          $('.general_error').text(response.err.display_text);
        }
      }
    },

    clearErrors: function( jParent ){
      if ( !jParent ) {
        jParent = $("body");
      }
      jParent.find('.error, .invalid-feedback').text('');
      jParent.find('input').removeClass('border-error');
    },


    addErrors: function(field_name, message){
      $('.error[data-forid="'+field_name+'"]').text(message);
      if(message != ''){
        $('[name="'+field_name+'"]').addClass('border-error');
      } else {
        $('[name="'+field_name+'"]').removeClass('border-error');
      }
    }

  }


})(window , jQuery);

jQuery.fn.extend({
  setCustomValidity: function() {
    var $form = $(this);
    $form.on('change', 'input[type=file]', function( event ){
      var targetEl = event.currentTarget,
          isError = false,
          errorMessage
      ;
      if( targetEl.files.length > 0 ){
        if(targetEl.files[0].size < $(targetEl).data('min-bytes')){
          isError =  true;
          errorMessage = targetEl.title+' file size too small';
        }else if( targetEl.files[0].size > $(targetEl).data('max-bytes')){
          isError =  true;
          var maxMb = $(targetEl).data('max-bytes') / (1024*1024);
          errorMessage = targetEl.title+' file size too large. Max allowed '+maxMb+' MB';
        }
      }
      if( isError ){
        $('.error[data-forid="'+targetEl.name+'"]').text(errorMessage).addClass('border-error');
      }else {
        $('.error[data-forid="'+targetEl.name+'"]').text("").removeClass('border-error');
        targetEl.setCustomValidity("");
      }
    });
  }
});
