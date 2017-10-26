;
(function (window) {

    var dashboardNs = ns("simpletoken.dashboard"),
        oThis;

      dashboardNs.timer = oThis = {

        init: function (config) {
          oThis.bindButtonActions();
        },

        bindButtonActions: function() {

          $("#kycWarning").click( function ( event ) {
            $('#update-warning-modal').modal('show');
            event.stopPropagation();
          });

          $("#continueToUpdate").click(function (event) {
            $('#update-warning-modal').modal('hide');
            window.location = "/update-kyc";
            return false;
          });

          $("#visible-button").on('click', function() {
            document.querySelector("#visible-input").select();
            document.execCommand('copy');
          });

        }

    };

    $(document).ready(function () {
        oThis.init();
    });

})(window);