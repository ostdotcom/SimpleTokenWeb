;
(function (window) {

  var dashboardNs = ns("simpletoken.dashboard"),
    oThis;
  showEthereumAddressConfirmModal: 'false';

  dashboardNs.timer = oThis = {

    init: function (config) {
      oThis.showEthereumAddressConfirmModal = config.show_ethereum_address_confirm_modal;
      oThis.bindButtonActions();

      if (config && config.try_reload == 'true') {
        oThis.checkForApprovedStatus();
      }

    },

    bindButtonActions: function () {

      $("#kycUpdate").click(function (event) {

        if ($(this).hasClass('openModal')) {
          var jModal = $('#update-warning-modal');
          //Clear the errors.
          simpletoken.utils.errorHandling.clearFormErrors(jModal);
          jModal.modal('show');
        }
        else {
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
        if (oThis.showEthereumAddressConfirmModal == 'true') {
          $('#ethereum-confirm-modal').modal('show');
        }
        else {
          oThis.getTokenSaleEthereumAddress();
        }
      });

      $("#userConfirm").click(function (event) {
        oThis.onEthereumConfirm(event);
      });

      $('#prove-support-content').on('shown.bs.collapse', function () {
        $(this).parents('.kyc-panel').find('#prove-support-link').addClass("close-accordian-icon");
      });

      $('#prove-support-content').on('hidden.bs.collapse', function () {
        $(this).parents('.kyc-panel').find('#prove-support-link').removeClass("close-accordian-icon");
      });

      $('#community-bonus-content').on('shown.bs.collapse', function () {
        $(this).parents('.kyc-panel').find('#community-bonus-link').addClass("close-accordian-icon");
      });

      $('#community-bonus-content').on('hidden.bs.collapse', function () {
        $(this).parents('.kyc-panel').find('#community-bonus-link').removeClass("close-accordian-icon");
      });

      $("#user-eth-address-validate-btn").click(function (event) {
        oThis.onValidateUserEthAddress(event);
      });

      $("#user-eth-address-success-done-btn, #user-eth-address-purchase-details-done-btn").click(function () {
        oThis.onUserEthAddressDone();
      });

      $("a[href='#eth-address']").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 500, function () {
            $('#user-eth-address-input').focus();
          });
        }
      });

      $("a[href='#sale-progress-container']").on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 500);
        }
      });

    },

    checkForApprovedStatus: function () {
      setInterval(function () {
        $.ajax({
          url: '/api/user/profile',
          dataType: 'json',
          method: 'GET',
          success: function (response) {
            if (response.success == true) {

              var data = response.data;
              if ((data.user_kyc_data.kyc_status == 'approved') && (data.client_setting.is_whitelist_setup_done == 'false' || (data.user_kyc_data.whitelist_status == 'done'))) {
                location.reload();
              }
              return false;
            }
          }
        });

      }, 30000); // 30 seconds

    },

    onEthereumConfirm: function (event) {
      var jModal = $('#ethereum-confirm-modal'),
        jAllCheckboxes = jModal.find("input:checkbox"),
        jCheckedCheckboxes = jAllCheckboxes.filter(":checked"),
        areAllChecked = jAllCheckboxes.length == jCheckedCheckboxes.length
      ;

      if (areAllChecked) {
        //Clear all errors.
        simpletoken.utils.errorHandling.clearFormErrors(jModal);

        //Call the server for the address.
        oThis.getTokenSaleEthereumAddress();

      } else {
        oThis.showEthereumAddressConfirmError("Please verify all above mentioned confirmations.");

      }
    },
    getTokenSaleEthereumAddress: function () {

      dataUrl = "/api/user/get-token-sale-address";
      if (oThis.showEthereumAddressConfirmModal == 'true') {
        var jModal = $('#ethereum-confirm-modal');
        $("#userConfirm").hide();
        $("#user-confirm-loader").removeClass("hide");
      }
      else {
        $("#user-confirm-loader").removeClass("hide");
      }

      $.ajax({
        url: dataUrl,
        dataType: 'json',
        method: "GET",
        success: function (response) {
          if (response.success == true) {
            //Show the address.
            oThis.showEthereumAddress(response.data["token_sale_ethereum_address"] || "");

            if (oThis.showEthereumAddressConfirmModal == 'true') {
              //Hide the modal.
              jModal.modal('hide');
            }

          } else {
            simpletoken.utils.errorHandling.displayFormErrors(response, jModal);
          }
        },
        error: function (jqXHR, exception) {
          simpletoken.utils.errorHandling.xhrErrResponse(jqXHR, exception, jModal);
        },
        complete: function () {
          $("#userConfirm").show();
          $("#user-confirm-loader").addClass("hide");
        }
      });
    },
    showEthereumAddressConfirmError: function (errorMessage) {
      var jModal = $('#ethereum-confirm-modal'),
        jErr = jModal.find('.error[data-for="general_error"]')
      ;
      jErr.html(errorMessage);
    },
    showEthereumAddress: function (ethAddress) {
      var jWrap = $("#ethereum-deposit-address"),
        jInput = jWrap.find("#ethereum-address-input")
      ;
      jInput.val(ethAddress);
      jWrap.show();
      $('#eth-gas-limit-title').show();
      $('#eth-deposit-address-title').hide();
      $("#get-deposit-address").hide();
    },


    /* Section: Validate User ETH Address - BEGIN */
    onValidateUserEthAddress: function (event) {
      var jWrap = $("#user-eth-address"),
        jErr = jWrap.find('.error[data-for="general_error"]'),
        jEthAddr = jWrap.find("#user-eth-address-input"),
        dataUrl = "/api/user/check-ethereum-balance"
      ;

      if (!jEthAddr.val()) {
        jErr.html("Invalid Etherenum Address");
        oThis.onUserEthAddressError();
        return;
      }

      var data = {
        "user_ethereum_address": jEthAddr.val()
      };
      simpletoken.utils.errorHandling.clearFormErrors(jWrap);
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
            if (purchaseDetails && Object.keys(purchaseDetails).length > 0) {

              var jResult = jWrap.find("#user-eth-address-purchase-details"),
                jUserEthAddressPurchaseEthSent = jResult.find("#user-eth-address-purchase-eth-sent"),
                jUserEthAddressPurchaseStAllotted = jResult.find("#user-eth-address-purchase-st-allotted"),
                jUserEthAddressBonusStAllotted = jResult.find("#user-eth-address-bonus-st-allotted"),

                sUserEthAddressPurchaseEthSent = "",
                sUserEthAddressPurchaseStAllotted = "",
                sUserEthAddressBonusStAllotted = "",

                totalEthereumSent = (purchaseDetails["total_ethereum_sent_by_user"] || '0'),
                totalStAllotted = (purchaseDetails["total_simple_token_allotted_to_user"] || '0')
              totalStBonus = (purchaseDetails["total_simple_token_bonus_to_user"] || '0')

              ;

              //
              sUserEthAddressPurchaseEthSent = totalEthereumSent + " ETH ";
              jUserEthAddressPurchaseEthSent.html(sUserEthAddressPurchaseEthSent);

              //
              sUserEthAddressPurchaseStAllotted = totalStAllotted + " ST ";
              jUserEthAddressPurchaseStAllotted.html(sUserEthAddressPurchaseStAllotted);

              //
              sUserEthAddressBonusStAllotted = totalStBonus + " ST ";
              jUserEthAddressBonusStAllotted.html(sUserEthAddressBonusStAllotted);

              jResult.show();
            } else {
              jWrap.find("#user-eth-address-success").show();
            }

          } else {
            simpletoken.utils.errorHandling.displayFormErrors(response, jWrap);
            oThis.onUserEthAddressError();
          }

        },
        error: function (jqXHR, exception) {
          simpletoken.utils.errorHandling.xhrErrResponse(jqXHR, exception, jWrap);
          oThis.onUserEthAddressError();
        }
      });
    },
    onUserEthAddressDone: function (event) {
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

})(window);