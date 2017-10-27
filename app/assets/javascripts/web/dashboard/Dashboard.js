;
(function (window) {

    var dashboardNs = ns("simpletoken.dashboard"),
        oThis;

    dashboardNs.timer = oThis = {

        init: function (config) {
            oThis.bindButtonActions();
        },

        bindButtonActions: function () {

            $("#kycUpdate").click(function (event) {

                if ($(this).hasClass('openModal')) {
                    $('#update-warning-modal').modal('show');
                }
                else{
                    $("#continueToUpdate").click();
                }
                event.stopPropagation();
            });

            $("#continueToUpdate").click(function (event) {
                $('#update-warning-modal').modal('hide');
                window.location = "/update-kyc";
                return false;
            });

            $("#visible-button").on('click', function () {
                document.querySelector("#visible-input").select();
                document.execCommand('copy');
            });

            $("#get-deposit-address").click(function (event) {
                $('#ethereum-confirm-modal').modal('show');
            });

            $("#userConfirm").click(function ( event ) {
                var jModal = $('#ethereum-confirm-modal')
                    ,jAllCheckboxes = jModal.find("input:checkbox")
                    ,jCheckedCheckboxes = jAllCheckboxes.filter(":checked")
                    ,areAllChecked = jAllCheckboxes.length == jCheckedCheckboxes.length
                ;

                if ( areAllChecked ) {
                    simpletoken.utils.errorHandling.clearFormErrors();
                    jModal.modal('hide');
                } else {
                    $('.error[data-for="verify_error"]').text('Please verify all above mentioned confirmations');
                }

            });

        }

    };

    $(document).ready(function () {
        oThis.init();
    });

})(window);