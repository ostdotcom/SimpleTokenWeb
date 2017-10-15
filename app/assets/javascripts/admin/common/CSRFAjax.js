;
(function($){

  var csrf_token;

  function append_csrf_token(){
    csrf_token = csrf_token || $("meta[name='csrf-token']").attr("content");
    return csrf_token;
  }

  $.ajaxPrefilter(function (options, originalOptions, xhr) {
    //xhr.setRequestHeader('X-CSRF-Token', append_csrf_token());
  });

})($);