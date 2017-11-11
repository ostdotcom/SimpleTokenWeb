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
                    window.location = "/update-kyc";
                    return false;
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
              $(this).parents('.kyc-panel').find('#prove-support-link').addClass("close-accordian-icon");
            });

            $('#prove-support-content').on('hidden.bs.collapse', function() {
              $(this).parents('.kyc-panel').find('#prove-support-link').removeClass("close-accordian-icon");
            });

            $("#user-eth-address-validate-btn").click( function( event ) {
                oThis.onValidateUserEthAddress( event );
            });

            $("#user-eth-address-success-done-btn, #user-eth-address-purchase-details-done-btn").click(function () {
                oThis.onUserEthAddressDone();
            });

            $("a[href='#eth-address']").on('click', function(event) {
              if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                  scrollTop: $(hash).offset().top
                }, 500, function(){
                  $('#user-eth-address-input').focus();
                });
              }
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
                oThis.getTokenSaleEthereumAddress();
                
            } else {
                oThis.showEthereumAddressConfirmError( "Please verify all above mentioned confirmations." );

            }            
        },
        getTokenSaleEthereumAddress: function () {
            var jModal = $('#ethereum-confirm-modal'),
                dataUrl = "/api/user/get-token-sale-address"
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
                    oThis.showEthereumAddress( response.data[ "token_sale_ethereum_address" ] || "" );

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
        },


        /* Section: Validate User ETH Address - BEGIN */
        onValidateUserEthAddress: function ( event ) {
            var jWrap = $("#user-eth-address"),
                jErr = jWrap.find('.error[data-for="general_error"]'),
                jEthAddr = jWrap.find("#user-eth-address-input"),
                dataUrl = "/api/user/check-ethereum-balance"
            ;
            
            if ( !jEthAddr.val() ) {
                jErr.html( "Invalid Etherenum Address" );
                oThis.onUserEthAddressError();
                return;
            }
            
            var data = {
                "user_ethereum_address" : jEthAddr.val()
            };
            simpletoken.utils.errorHandling.clearFormErrors( jWrap );
            oThis.clearUserEthAddressError();
            $.ajax({
                url: dataUrl,
                data: data,
                dataType: "json",
                method: "GET",
                success: function (response) { 
                  if (response.success == true) {
                    var data = response.data || {};
                    jWrap.find("#user-eth-address-input-wrap").hide();
                    
                    var purchaseDetails = data["purchase_details"];
                    if ( purchaseDetails && Object.keys(purchaseDetails).length > 0 ) {
                        
                        var jResult = jWrap.find("#user-eth-address-purchase-details"),
                            jUserEthAddressPurchaseSent = jResult.find("#user-eth-address-purchase-sent"),
                            jUserEthAddressPurchaseAlloted = jResult.find("#user-eth-address-purchase-alloted"),
                            jUserEthAddressPurchaseRatio = jResult.find("#user-eth-address-purchase-ratio"),

                            sUserEthAddressPurchaseSent = "",
                            sUserEthAddressPurchaseAlloted = "",
                            sUserEthAddressPurchaseRatio = "",

                            totalEthereumSent   = (0),
                            totalDollarsSent    = (0),
                            stAllottedEthereum  = (0),
                            stAllottedDollar    = (0)

                        ;

                        totalEthereumSent = $.number(totalEthereumSent, 2);
                        totalDollarsSent = $.number(totalDollarsSent, 2);
                        stAllottedEthereum = $.number(stAllottedEthereum, 2);
                        stAllottedDollar = $.number(stAllottedDollar, 2);

                        //
                        sUserEthAddressPurchaseSent = totalEthereumSent + " ETH "
                            + " ($" + totalDollarsSent + ")";
                        jUserEthAddressPurchaseSent.html( sUserEthAddressPurchaseSent );

                        //
                        sUserEthAddressPurchaseAlloted = stAllottedEthereum + " ETH "
                            + " ($" + stAllottedDollar + ")";
                        jUserEthAddressPurchaseAlloted.html( sUserEthAddressPurchaseAlloted );


                        sUserEthAddressPurchaseRatio = purchaseDetails[ "token_to_ethereum_ratio" ];
                        jUserEthAddressPurchaseRatio.text( sUserEthAddressPurchaseRatio );

                        jResult.show();
                    } else {
                        jWrap.find("#user-eth-address-success").show();
                    }
                    
                  } else {
                    simpletoken.utils.errorHandling.displayFormErrors( response, jWrap);
                    oThis.onUserEthAddressError();
                  }

                },
                error: function (jqXHR, exception) { 
                    simpletoken.utils.errorHandling.xhrErrResponse(jqXHR, exception, jWrap);
                    oThis.onUserEthAddressError();
                }
            });
        },
        onUserEthAddressDone: function ( event ) {
            var jWrap = $("#user-eth-address");
            jWrap.find("#user-eth-address-success").hide();
            jWrap.find("#user-eth-address-purchase-details").hide();
            jWrap.find("#user-eth-address-input-wrap").show();
        },
        onUserEthAddressError: function () {
            var jWrap = $("#user-eth-address"),
                jEthAddr = jWrap.find("#user-eth-address-input")
            ;
            jEthAddr.addClass('border-error');

        },
        clearUserEthAddressError: function () {
            var jWrap = $("#user-eth-address"),
                jEthAddr = jWrap.find("#user-eth-address-input")
            ;
            jEthAddr.removeClass('border-error');
        }
        /* Section: Validate User ETH Address - END */
    };

    $(document).ready(function () {
        oThis.init();
    });

})(window);