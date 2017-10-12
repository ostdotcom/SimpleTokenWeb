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
      } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
        msg = 'Time out error.';
      } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
      } else {
        msg = 'Uncaught Error. ' + jqXHR.responseText;
      }
      return msg;
    },

    displayFormErrors: function(response){

      if((response.success === false) || (response.err != undefined && response.err != '')){

        simpletoken.utils.errorHandling.clearFormErrors();
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

    clearFormErrors: function(){
      $('.error[data-for]').text('');
      $('input').removeClass('border-error');
    }

  };

})(window);