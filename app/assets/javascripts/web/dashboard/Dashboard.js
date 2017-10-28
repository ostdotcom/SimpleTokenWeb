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
                    var jModal = $('#update-warning-modal');
                    //Clear the errors.
                    simpletoken.utils.errorHandling.clearFormErrors( jModal );
                    jModal.modal('show');
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

            $("#ethereum-address-copy-btn").on('click', function () {
                document.querySelector("#ethereum-address-input").select();
                document.execCommand('copy');
            });

            $("#get-deposit-address").click(function (event) {
                $('#ethereum-confirm-modal').modal('show');
            });

            $("#userConfirm").click(function ( event ) {
                oThis.onEthereumConfirm( event );
            });

            $('#prove-support-content').on('shown.bs.collapse', function() {
              $(this).parents('.kyc-panel').find('#prove-support-link').text('X')
            });

            $('#prove-support-content').on('hidden.bs.collapse', function() {
              $(this).parents('.kyc-panel').find('#prove-support-link').text('Prove Support')
            });

        },
        onEthereumConfirm: function ( event ) {
            var jModal = $('#ethereum-confirm-modal'),
                jAllCheckboxes = jModal.find("input:checkbox"),
                jCheckedCheckboxes = jAllCheckboxes.filter(":checked"),
                areAllChecked = jAllCheckboxes.length == jCheckedCheckboxes.length
            ;

            if ( areAllChecked ) {
                //Clear all errors.
                simpletoken.utils.errorHandling.clearFormErrors( jModal );

                //Call the server for the address.
                oThis.getFoundationEthereumAddress();
                
            } else {
                oThis.showEthereumAddressConfirmError( "Please verify all above mentioned confirmations." );

            }            
        },
        getFoundationEthereumAddress: function () {
            var jModal = $('#ethereum-confirm-modal'),
                dataUrl = "/api/user/ethereum-address"
            ;
            $("#userConfirm").hide();
            $("#user-confirm-loader").removeClass( "hide" );
            $.ajax({
                url: dataUrl,
                dataType: 'json',
                method: "GET",
                success: function (response) {
                  if (response.success == true) {
                    //Show the address.
                    oThis.showEthereumAddress( response.data[ "foundation_ethereum_address" ] || "" );

                    //Hide the modal.
                    jModal.modal('hide');
                    
                  } else {
                    simpletoken.utils.errorHandling.displayFormErrors( response, jModal);
                  }
                },
                error: function (jqXHR, exception) {
                    simpletoken.utils.errorHandling.xhrErrResponse(jqXHR, exception, jModal);
                },
                complete: function () {
                    $("#userConfirm").show();
                    $("#user-confirm-loader").addClass( "hide" );
                }
            });
        },
        showEthereumAddressConfirmError: function ( errorMessage ) {
            var jModal = $('#ethereum-confirm-modal'),
                jErr = jModal.find('.error[data-for="general_error"]')
            ;
            jErr.html( errorMessage );
        },
        showEthereumAddress: function ( ethAddress ) {
            var jWrap = $("#ethereum-deposit-address"),
                jInput = jWrap.find("#ethereum-address-input")
            ;
            jInput.val( ethAddress );
            jWrap.show();
            $("#get-deposit-address").hide();
        }

    };

    $(document).ready(function () {
        oThis.init();
    });

})(window);