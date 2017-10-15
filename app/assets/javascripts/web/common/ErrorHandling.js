;
(function(window){
  var utilsNs = ns("simpletoken.utils");

  utilsNs.errorHandling = {
    xhrErrResponse: function(jqXHR, exception){
      var msg = '';
      if (jqXHR.status === 0) {
        msg = 'Not able to connect to server. Please verify your internet connection.';
      } else if (jqXHR.status == 404) {
        msg = 'Requested page not found.';
      } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error.';
      } else if (jqXHR.status == 401) {
          window.location = '/login';
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Unable to connect to server.';
      }
      $('.error[data-for="general_error"]').text(msg);

    },

    displayFormErrors: function(response){

      if((response.success === false) || (response.err != undefined && response.err != '')){

        utilsNs.errorHandling.clearFormErrors();
        $('.error[data-for="general_error"]').text(response.err.display_text);

        if(typeof response.err.error_data != undefined){
          $.each(response.err.error_data, function(e_key, e_val){
            var ele = $('.error[data-for="'+e_key+'"]');
            ele.text(e_val);
            ele.parent().find('input').addClass('border-error');
          });
        }
      }

    },

    validationGeneric: function(jQobjs){

        var fields = jQobjs;
        var error_count = 0;
        utilsNs.errorHandling.clearFormErrors();

        $.each(fields, function(key, field){

            if(($(field).attr('type') === 'text' || $(field).attr('type') === 'file') && $(field).val().trim() == ''){

                var field_name = $(field).closest('.form-group').find('label').text();
                var field_key = $(field).attr('name');

                $(field).addClass('border-error');
                $('.error[data-for="'+field_key+'"]').text(field_name+' is required');

                error_count++;
            }

            if($(field).attr('type') === 'password' && $(field).val().trim().length < 8){

                var field_name = $(field).closest('.form-group').find('label').text();
                var field_key = $(field).attr('name');

                $(field).addClass('border-error');
                $('.error[data-for="'+field_key+'"]').text(field_name +' should be minimum 8 characters');

                error_count++;
            }

        });
        if(error_count === 0) {return true;}
        return false;
    },

    clearFormErrors: function(){
      $('.error[data-for]').text('');
      $('input').removeClass('border-error');
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

  };

  $(document).ready(function () {
    $("#visible-button").on('click', function() {
      document.querySelector("#visible-input").select();
      document.execCommand('copy');
    });
  });

})(window);