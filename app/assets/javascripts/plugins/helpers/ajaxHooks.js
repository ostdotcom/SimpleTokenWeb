;
(function(window, $){

  function getNextParameter(){
      const urlParams = new URLSearchParams(window.location.search);
      //gives decoded string
      const r_m = urlParams.get('r_m');
      if (r_m == "1"){
          return ("?next=" + encodeURIComponent( window.location.pathname + window.location.search));
      } else{
        return "";
      }
  }

  function getStatus401redirect(){
    if( typeof status401redirect == "string" &&  status401redirect.length > 0 ){
        //  do not use query paramters in status401redirect url
      return status401redirect + getNextParameter();
    }else {
      return "/login" + getNextParameter();
    }
  };
  
  // //Add CSRF TOKEN
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    var csrf_token = $("meta[name='csrf-token']").attr("content");
    if ( csrf_token ) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrf_token);  
    }
  });

  
  $( window.document ).ajaxError( function( event, jqXHR, settings, thrownError ) {

    var jParent = (jqXHR.ost && jqXHR.ost.jParent ) ? jqXHR.ost.jParent : $("body")
        , msg   = ''
    ;
    if (jqXHR.status === 0) {
      msg = 'Not able to connect to server. Please verify your internet connection.';
    } else if (jqXHR.status == 404) {
      msg = 'Requested page not found.';
    } else if (jqXHR.status == 500) {
      msg = 'Internal Server Error.';
    } else if (jqXHR.status == 401) {

        window.location = getStatus401redirect();
    } else if (jqXHR.status == 302) {
        console.log("Yo i m here 3");
        var redirect_url;
        try {
            var _body = JSON.parse(jqXHR.responseText) || {},
                _err = _body['err'] || {},
                error_extra_info = _err['error_extra_info'] || {};
            redirect_url = error_extra_info['redirect_url'];
        } catch (e)  {
            redirect_url = getStatus401redirect();
        }
        window.location.href = redirect_url;
    } else if (thrownError === 'parsererror') {
      msg = 'Requested JSON parse failed.';
    } else if (thrownError === 'timeout') {
      msg = 'Time out error.';
    } else if (thrownError === 'abort') {
      msg = 'Ajax request aborted.';
    } else {
      msg = 'Unable to connect to server.';
    }

    console.log("ajaxError", arguments, msg);
    if ( msg ) {
      jParent
        .find(".general_error")
        .addClass("is-invalid")
          .text(msg)
      ;      
    } else {
      jParent
        .find('.general_error')
        .removeClass("is-invalid")
          .text(msg || "");
      ;
    }

    return msg;
  });
})(window, jQuery);