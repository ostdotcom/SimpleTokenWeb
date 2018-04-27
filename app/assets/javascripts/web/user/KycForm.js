;
(function (window) {

  var homeNs = ns("simpletoken.home"),
    utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

    uploadParamsResponse: {},
    uploadCount: 0,
    isResidencyProofNeeded: false,
    currentPercent: 0,
    formNames: ['document_id_file_path', 'selfie_file_path', 'investor_file_path'],
    residencyProofMandatoryCountries: [],
    popoverPlacement: 'right',
    $kycForm: $('#kycForm'),

    init: function (config) {
      oThis.config = config;
      oThis.residencyProofMandatoryCountries = config.residency_proof_nationalities;
      oThis.bindButtonActions();
      oThis.refreshIndicator();
      oThis.$kycForm.setCustomValidity();

    },

    bindButtonActions: function () {

      $('#fileupload').fileupload({
        dataType: 'xml',
        method: 'POST',
        autoUpload: false,
        singleFileUploads: false,
        done: function (e, data) {
          $.each(oThis.uploadParamsResponse, function (upload_key, upload_value) {
            if (upload_value.fields.key == data.formData.key) {
              oThis.uploadParamsResponse[upload_key].status = data.jqXHR.status;
            }
          });
          oThis.uploadCount--;
          if (oThis.uploadCount == 0) {
            oThis.submitData();
          }
        },
        progress: function (e, data) {
          var percent = Math.round((data.loaded / data.total) * 100);
          if (oThis.currentPercent < percent) {
            oThis.currentPercent = percent;
            $('#verifyModal .loader-content .progress .progress-bar')
              .css('width', percent + '%');
              //.text(percent + '%');
          }
        },
        error: function (jqXHR, exception) {
          oThis.verifyModal('show-close');
          oThis.verifyModal('hide-progress');
          oThis.verifyModal('status-text', utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
        },
        fail: function (e, data) {
          var xmlResponse = $(data.jqXHR.responseXML);
          oThis.verifyModal('show-close');
          oThis.verifyModal('hide-progress');
          oThis.verifyModal('status-text', 'Upload Error: ' + xmlResponse.find('Code').text() + '. Please contact support.');
        },
      });


      $(".multi-upload-file").click(function(e){
  console.log("hehre");
          if ($(".file-wrapper .upload").length == 0) {
            oThis.fileCount = 0;
          }
          else {
            oThis.fileCount++;
          }

          $(".file-wrapper").append('<input type="file" name="investor_file_path" data-file-count="' + oThis.fileCount + '" class="upload btn btn-orange" accept="image/*,application/pdf" data-min-bytes="204800" data-max-bytes="15728640" tabindex="<%= tabindex_val %>" required/>');
          $(".file-wrapper input[type='file'].upload:last-child").trigger("click");

          $('.file-wrapper').find('input[type="file"]').change(function () {

              // <div class="file-name display-4 my-1 col-6"></div>
              $('.multi-file-wrapper').append($("<div class='col-7 mt-2 display-background' data-file-count='" + oThis.fileCount + "'></div>").text($(this).val().split('\\').pop()).append('<img title="close" data-file-count="' + oThis.fileCount + '" class="upload-file-close-btn mt-1" src="close.svg"</img>'));
              $('.upload-file-close-btn').click(function (e) {
                var fileCount = $(e.target).data('file-count');
                $(".file-wrapper").find("[data-file-count=" + fileCount + "]").remove();
                $('.multi-file-wrapper').find("[data-file-count=" + fileCount + "]").remove();

                oThis.updateMultiFileBtnStateForInvestor();
              }).bind(oThis);
              oThis.updateMultiFileBtnStateForInvestor();
          });

      });
      

      $('.single-upload-file').click(function () {

        $(this).closest('.form-group').find('.file-name').append('<input type="file" style="position:absolute; top:-1000px; left:-1000px" name="single-file-upload" class="upload btn btn-orange" accept="image/*,application/pdf" data-min-bytes="204800" data-max-bytes="15728640" required/>');
        $(this).closest('.form-group').find('.file-name').find("input[type='file']").trigger("click");
        var chooseButtonObject = $(this).closest('.form-group').find("input[type='button']");

        $(this).closest('.form-group').find('.file-name').find("input[type='file']").change(function () {

         $(this).closest('.form-group').find('.file-name').text($(this).val().split('\\').pop()).addClass('display-background').append('<img class="upload-file-close-btn"src="close.svg"  alt="Image"/>');
         chooseButtonObject.attr('disabled','disabled');

         $(".upload-file-close-btn").click(function (event) {
           $(this).closest('.form-group').find('input[type="button"]').removeAttr('disable');
           $(this).closest('.form-group').find('.file-name').find("input[type='file']").remove();
           chooseButtonObject.removeAttr('disabled');
           console.log("chooseButtonObject : ",chooseButtonObject);
           $(this).closest('.form-group').find('.file-name').html('').removeClass('display-background');
         });
        });
      });

      $('.radio-button-yes').click(function () {
        console.log("radio button yes clicked");
        $('.upload-proof-invester').css('display','');

      });

      $('.radio-button-no').click(function () {
        console.log("radio button no clicked");
        $('.upload-proof-invester').css('display','none');
      });

      oThis.$kycForm.find('input[name=birthdate]')
        .datepicker({
          format: 'dd/mm/yyyy',
          autoclose: true,
          startDate: '01/01/1900',
          endDate: '01/11/1999',
          orientation: 'bottom'
        })
        .on('changeDate', function (e) {
          $(this).trigger('change');
        });

      oThis.$kycForm.find('select[name="nationality"]').on('changed.bs.select', function (e) {
        if (oThis.residencyProofMandatoryCountries.indexOf($(this).val()) > -1) {
          if (oThis.isResidencyProofNeeded === true) {
            return;
          }
          oThis.isResidencyProofNeeded = true;
          $('.residence-proof').show();
          oThis.formNames.push('residence_proof_file_path');
        } else {
          if (oThis.isResidencyProofNeeded === false) {
            return;
          }
          oThis.isResidencyProofNeeded = false;
          $('.residence-proof').hide();
          if (oThis.formNames.length == 3) {
            oThis.formNames.pop()
          }
        }
      });

      oThis.$kycForm.find('input').change(function () {
        $(this).removeClass('border-error');
        $(this).closest('.form-group').find('.error[data-for]').text('');
      });

      oThis.$kycForm.find('input[type="file"]').change(function () {
        if ($(this).val())    {
           $(this).closest('.form-group').find('.file-name').text($(this).val().split('\\').pop()).addClass('display-background').append('<img class="upload-file-close-btn"src="close.svg"  alt="Image"/>');
           $(this).closest('.form-group').find('.upload-file').addClass('disable-upload-button');
           $(".upload-file-close-btn").click(function (event) {
             $(this).closest('.form-group').find('.upload-file').removeClass('disable-upload-button');
             $(this).closest('.form-group').find('.file-name').html('').removeClass('display-background');
           });
        }
      });

      $("#kycSubmit").click(function (event) {
        event.preventDefault();
        oThis.validateForm();
      });

      if ($(window).width() < 767) {
        oThis.popoverPlacement = 'bottom'
      }

      oThis.$kycForm.find('label[for=document_id_file_path] .badge').popover({
        placement: oThis.popoverPlacement,
        content: $('#passport-popover').text(),
        html: true,
        trigger: 'hover'
      });

      oThis.$kycForm.find('label[for=selfie_file_path] .badge').popover({
        placement: oThis.popoverPlacement,
        content: $('#selfie-popover').text(),
        html: true,
        trigger: 'hover'
      });

      $('#kycVerify').click(function () {
        if ($('#verifyModal input:checkbox:checked').length == $('#verifyModal input:checkbox').length) {
          simpletoken.utils.errorHandling.clearFormErrors();
          oThis.getSignedUrls();
        } else {
          $('.error[data-for="verify_error"]').text('Please verify all above mentioned confirmations');
        }
      });

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
      }


      $('#redictToDashboard').click(function () {
        window.location = '/dashboard';
      });

      $('#kycUpdateFailed').click(function () {
        oThis.hideKycUpdateFailedDialog();
      });
    },

    updateMultiFileBtnStateForInvestor : function () {
      console.log("updateMultiFileBtnStateForInvestor")
      if ($(".file-wrapper .upload").length >= 3){
        $(".multi-upload-file").attr("disabled","disabled");
      } else{
        $(".multi-upload-file").removeAttr("disabled");
      }
    },

    refreshIndicator: function () {
      var $refresh = $('#refresh-indicator');
      $refresh.val() == 'yes' ? location.reload(true) : $refresh.val('yes');
    },

    isValidAddress: function (address, onValidCallback, onErrorCallback) {
      $.ajax({
        url: '/api/user/check-ethereum-address',
        data: {
          'ethereum_address': address
        },
        success: function (response) {
          if ((response.success === false) || (response.err != undefined && response.err != '')) {
            if (typeof response.err.error_data != undefined) {
              oThis.$kycForm.find('.error[data-for="ethereum_address"]').text(response.err.error_data.ethereum_address);
            }
            onErrorCallback && onErrorCallback(response);
          } else {
            onValidCallback && onValidCallback(response);
          }
        },
        error: function (jqXHR, exception) {
          utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    },

    validateForm: function () {

      simpletoken.utils.errorHandling.clearFormErrors();

      oThis.$kycForm.find('input[type="file"]').attr('required', false);

      oThis.formNames.forEach(function (value) {
        oThis.$kycForm.find('input[name="' + value + '"]').attr('required', true);
      });

      oThis.$kycForm.find('input, select, textarea').each(function () {
        $(this).trigger('change');
      });

      if (typeof oThis.$kycForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha != 'undefined') {
        if (grecaptcha.getResponse() == '') {
          oThis.$kycForm.find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
        }
      }

      if (oThis.$kycForm.find('.error:not(:empty)').length == 0) {
        simpletoken.utils.errorHandling.clearFormErrors();
        var jKYCSubmit = oThis.$kycForm.find("#kycSubmit")

        //Disbale the Submit Button
        jKYCSubmit.prop("disabled", true).text("SUBMITTING...");

        //Validate Eth Address
        var ethAddress = oThis.$kycForm.find('input[name="ethereum_address"]').val();
        oThis.isValidAddress(ethAddress,
          function () { /* Success Callback */
            //Enable the Submit Button
            jKYCSubmit.prop("disabled", false).text("SUBMIT");

            //Form is now valid
            oThis.onFormValid();
          }, function () { /* Error Callback */

            //Enable the Submit Button
            jKYCSubmit.prop("disabled", false).text("SUBMIT");

            //Form has Errors..
            oThis.onFormError();
          });

      } else {
        oThis.onFormError();
      }

    },
    onFormValid: function () {
      simpletoken.utils.errorHandling.clearFormErrors();

      if (oThis.config.show_verify_modal === true) {
        // Show verify modal with checkboxes
        oThis.verifyModal();
        oThis.verifyModal('verify');
      } else {

        // Show verify modal only for progress and start upload process
        oThis.verifyModal();
        oThis.getSignedUrls();
      }
    },
    onFormError: function () {
      if (typeof grecaptcha != 'undefined') {
        grecaptcha.reset();
      }
      oThis.$kycForm.find('.error[data-for="general_error"]').text('We found some errors in your KYC form. Please scroll up to review');
    },

    makeFileParams: function () {
      var fileParams = '';
      var formSelectors = [];

      oThis.formNames.forEach(function (value) {

        if (value === 'investor_file_path')

        formSelectors.push('#kycForm input[name="' + value + '"]');
        console.log("formSelectors.push : ", '#kycForm input[name="' + value + '"]');
      });

      $.each($(formSelectors.join(',')), function (key, value) {

        var file_type = value.files[0].type;
        var file_name = value.name;

        if (file_type.substr(0, 5) == 'image') {
          var file_category = 'images';
        } else if ("application/pdf".substr(-3) == 'pdf') {
          var file_category = 'pdfs';
        }

        fileParams += file_category + '[' + file_name + ']=' + file_type + '&';

      });

      return fileParams;
    },

    getSignedUrls: function () {

      oThis.verifyModal('loader');
      oThis.verifyModal('hide-close');
      oThis.verifyModal('hide-progress');
      oThis.verifyModal('status-text', 'Encrypting your upload data...');

      $.ajax({
        url: '/api/user/upload-params/?' + oThis.makeFileParams(),
        success: function (response) {
          if (response.success === true) {
            oThis.uploadParamsResponse = response.data;
            console.log("response.data : ",response.data);
            oThis.uploadFiles(oThis.uploadParamsResponse);
          } else {
            grecaptcha.reset();
            oThis.verifyModal('show-close');
            oThis.verifyModal('status-text', response.err.display_text);
            simpletoken.utils.errorHandling.displayFormErrors(response);
          }
        },
        error: function (jqXHR, exception) {
          utilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      })
    },

    uploadFiles: function (data) {

      oThis.verifyModal('show-progress');
      oThis.verifyModal('status-text', 'We are uploading the file via a secure channel.<br /> This might take sometime, please do not refresh the page.');

      $.each(data, function (upload_key, upload_value) {
        $('#fileupload').fileupload('send', {
          files: [$('#kycForm input[name=' + upload_key + ']')[0].files[0]],
          paramName: ['file'],
          url: upload_value.url,
          formData: upload_value.fields
        });
        oThis.uploadCount++;
      });
    },

    submitData: function () {

      oThis.verifyModal('hide-progress');
      oThis.verifyModal('status-text', 'Submitting your KYC data...');

      var $form = $('#kycForm');
      var $data = $form.serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      $.each(oThis.uploadParamsResponse, function (upload_key, upload_value) {
        $data[upload_key] = upload_value.fields.key;
      });

      $.ajax({
        url: $form.attr('action'),
        dataType: 'json',
        method: $form.attr('method'),
        data: $data,
        success: function (response) {
          if (response.success == true) {
            //window.location = '/dashboard';
            oThis.showKycSuccessDialog();
            return false;
          } else {
            grecaptcha.reset();
            oThis.verifyModal('show-close');
            //oThis.verifyModal('status-text', response.err.display_text);
            oThis.showKycUpdateFailedDialog();
            simpletoken.utils.errorHandling.displayFormErrors(response);
          }
        },
        error: function (jqXHR, exception) {
          grecaptcha.reset();
          oThis.verifyModal('show-close');
          //oThis.verifyModal('status-text', utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));

          oThis.showKycUpdateFailedDialog();
        }
      });
    },

    verifyModal: function (mode, message) {

      $verifyModal = $('#verifyModal');

      if (typeof mode == 'undefined') {
        $verifyModal.modal({
          backdrop: 'static',
          keyboard: false
        }).modal('show');
      }

      if (mode == 'verify') {
        $verifyModal.find('.verify-content').show();
        $verifyModal.find('.loader-content').hide();
        $verifyModal.find('.close').show();
        $verifyModal.find('input:checkbox').prop('checked', false);
      }

      if (mode == 'loader') {
        $verifyModal.find('.verify-content').hide();
        $verifyModal.find('.loader-content').show();
      }

      if (mode == 'hide-close') {
        $verifyModal.find('.close').hide();
      }

      if (mode == 'show-close') {
        $verifyModal.find('.close').show();
      }

      if (mode == 'hide-progress') {
        $verifyModal.find('.loader-content .progress').hide();
        $verifyModal.find('.loader-content .progress .progress-bar')
          .css('width', '1%')
          .text('');
      }

      if (mode == 'show-progress') {
        $verifyModal.find('.loader-content .progress').show();
      }

      if (mode == 'status-text') {
        $verifyModal.find('.loader-content .status').text(message);
      }

    },
    
    showKycSuccessDialog:function () {
      $kycSuccessModel = $('#kycSuccessModel');

      $kycSuccessModel.modal({
        backdrop: 'static',
        keyboard: false
      }).modal('show');
    },

    showKycUpdateFailedDialog:function () {
      $kycUpdateFailedModel = $('#kycUpdateFailedModel');

      $kycUpdateFailedModel.modal({
        backdrop: 'static',
        keyboard: false
      }).modal('show');
    },

    hideKycUpdateFailedDialog:function () {
      $kycUpdateFailedModel = $('#kycUpdateFailedModel');

      $kycUpdateFailedModel.modal({
        backdrop: 'static',
        keyboard: false
      }).modal('hide');
    }


  };

})(window);