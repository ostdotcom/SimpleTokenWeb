;
(function(window){
    var utilsNs = ns("simpletokenadmin.utils");

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
            window.location = '/admin/login';
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
      }
    };

})(window);