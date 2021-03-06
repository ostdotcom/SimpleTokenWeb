;
(function (window) {

  var homeNs = ns("simpletoken.home"),
    utilities = ns('simpletoken.utilities'),
    oThis;

  homeNs.kyc = oThis = {

    uploadParamsResponse: {},
    uploadCount: 0,
    isResidencyProofNeeded: false,
    currentPercent: 0,
    formNames: ['document_id_file_path', 'selfie_file_path'],
    residencyProofMandatoryCountries: [],
    popoverPlacement: 'right',
    $kycForm: $('#kycForm'),
    jKYCSubmit: $('#kycSubmit'),
    formHelper : null,

    init: function (config) {
      oThis.config = config;
      oThis.formHelper = oThis.$kycForm.formHelper();
      oThis.residencyProofMandatoryCountries = config.residency_proof_nationalities;
      oThis.bindButtonActions();
      oThis.refreshIndicator();
      oThis.$kycForm.setCustomValidity();
      if ($('#investor_proofs').length > 0) {
        oThis.addFormName('investor_proof_files_path[]');
      }

      //Jquerey validate triggers on option click, with selectpicker actual options are not clicked.
      $('select.selectpicker').on('change' , function () {
        $(this).valid();
      });

      $('#verifyModal').on('hidden.bs.modal' , function ( e ) {
          $(this).find('.invalid-feedback').removeClass('is-invalid');
      });
    },

    bindButtonActions: function () {

      /*
       * fileupload plugin API and callbacks
       */
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
          oThis.verifyModal('status-text', exception );
        },
        fail: function (e, data) {
          var xmlResponse = $(data.jqXHR.responseXML);
          oThis.verifyModal('show-close');
          oThis.verifyModal('hide-progress');
          oThis.verifyModal('status-text', 'Upload Error: ' + xmlResponse.find('Code').text() + '. Please contact support.');
        },
      });

      /*
       * Multi-file upload component
       */
      $(".file-upload .upload-image-btn").click(function (e) {

        var fileUpload = $(this).closest('.file-upload');

        var fileInputLast = fileUpload.find(".file-wrapper input[type='file'].upload:last-child");
        var file = fileInputLast.length && fileInputLast[0].files[0];

        if (fileInputLast.length && !file){
          fileUpload.find(".file-wrapper input[type='file'].upload:last-child").remove();
        }

        if (fileUpload.find(".file-wrapper .upload").length == 0) {
          oThis.fileCount = 0;
        }
        else if(fileInputLast.length && file) {
          oThis.fileCount++;
        }

        var errorJEl = fileUpload.find('.error');
        errorJEl.text("");

        var file_attrs = {
          title: fileUpload.data('title'),
          name: fileUpload.data('name'),
          accept: fileUpload.data('accept'),
          minBytes: fileUpload.data('min-bytes'),
          maxBytes: fileUpload.data('max-bytes')
        };

        var maxLength = fileUpload.data('max-length');

        if (fileUpload.find(".file-wrapper .upload").length < maxLength) {

          fileUpload.find(".file-wrapper").append('<input type="file" title="' + file_attrs.title + '" name="' + file_attrs.name + '" data-input-used-name="' + (file_attrs.name.replace("[]", "_") + oThis.fileCount) + '" data-file-count="' + oThis.fileCount + '" class="upload btn btn-orange" accept="' + file_attrs.accept + '" data-min-bytes="' + file_attrs.minBytes + '" data-max-bytes="' + file_attrs.maxBytes + '" required/>');
          fileUpload.find(".file-wrapper input[type='file'].upload:last-child").trigger("click");

          fileUpload.find('.file-wrapper input[type="file"]').change(function () {

            if (fileUpload.find(".file-wrapper-view .file-name").length < maxLength) {
              var inputDataCount = fileUpload.find(".file-wrapper-view [data-file-count=" + oThis.fileCount + "]");
              if ($(this).val() && inputDataCount.length === 0) {
                fileUpload.find('.file-wrapper-view').append($("<div class='file-name display-4 mt-2 display-background' data-file-count='" + oThis.fileCount + "'></div>").text($(this).val().split('\\').pop()).append('<svg class="icon upload-file-close-btn" data-file-count="' + oThis.fileCount + '"> <switch><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close-icon"></use> </switch> </svg>'));
                fileUpload.find('.upload-file-close-btn').click(function (e) {
                  var fileCount = $(e.target).closest('.file-name').data('file-count');
                  var fileUpload = $(this).closest('.file-upload');
                  var errorJEl = fileUpload.find('.error');
                  fileUpload.find(".file-wrapper [data-file-count=" + fileCount + "]").remove();
                  fileUpload.find('.file-wrapper-view [data-file-count=' + fileCount + ']').remove();
                  errorJEl.text("");

                  oThis.updateMultiFileBtnStateForInvestor(fileUpload);
                }).bind(oThis);

                oThis.updateMultiFileBtnStateForInvestor(fileUpload);
              }
            }
          });
        }
      });

      /*
       * Multi-file upload component - change handler
       */
      oThis.$kycForm.find('input[type="file"]').change(function () {
        if ($(this).val()) {
          $(this).closest('.form-group').find('.file-name').text($(this).val().split('\\').pop()).addClass('display-background').append('<img class="upload-file-close-btn"src="close.svg"  alt="Image"/>');
          $(this).closest('.form-group').find('.upload-file').addClass('disable-upload-button');
          $(".upload-file-close-btn").click(function (event) {
            $(this).closest('.form-group').find('.upload-file').removeClass('disable-upload-button');
            $(this).closest('.form-group').find('.file-name').html('').removeClass('display-background');
          });
        }
      });

      /*
       * Show/hide investor_proof_files_path
       */
      $('.radio-button-yes').click(function () {
        $('.upload-proof-invester').css('display', '');
        oThis.addFormName('investor_proof_files_path[]');
      });

      $('.radio-button-no').click(function () {
        $('.upload-proof-invester').css('display', 'none');
        oThis.removeFormName('investor_proof_files_path[]');
      });

      /*
       * Init datepicker and trigger change on changeDate
       */
      oThis.$kycForm.find('input[name=birthdate]')
        .datepicker({
          format: 'dd/mm/yyyy',
          autoclose: true,
          startDate: '01/01/1900',
          endDate: oThis.getCutoffDate(),
          orientation: 'bottom'
        })
        .on('changeDate', function (e) {
          $(this).valid();
        });

      /*
       * Show/hide nationality and update formName based on selection
       */
      oThis.$kycForm.find('select[name="nationality"]').on('changed.bs.select', function (e) {
        if (oThis.residencyProofMandatoryCountries.indexOf($(this).val()) > -1) {
          if (oThis.isResidencyProofNeeded === true) {
            return;
          }
          oThis.isResidencyProofNeeded = true;
          $('.residence-proof').show();

          oThis.addFormName('residence_proof_file_path');

        } else {
          if (oThis.isResidencyProofNeeded === false) {
            return;
          }
          oThis.isResidencyProofNeeded = false;
          $('.residence-proof').hide();

          oThis.removeFormName('residence_proof_file_path');
        }
      });


      /*
       * Form validation
       */
      $("#kycSubmit").click(function (event) {
        event.preventDefault();
        oThis.validateForm();
      });

      /*
       * Ppoover init etc...
       */
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

      /*
       * Form checkboxes validation and submit
       */
      $('#kycVerify').click(function () {
        if ($('#verifyModal input:checkbox:checked').length == $('#verifyModal input:checkbox').length) {
          $('.invalid-feedback[data-forid="verify_error"]').text('').removeClass('is-invalid');
          oThis.getSignedUrls();
        } else {
          $('.invalid-feedback[data-forid="verify_error"]').text('Please verify all above mentioned confirmations').addClass('is-invalid');
        }
      });

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
      }

      $('#kycUpdateFailed').click(function () {
        oThis.hideKycUpdateFailedDialog();
      });
    },

    getCutoffDate: function() {
      var today = new Date(),
       eighteenYearsAgo = today.setFullYear(today.getFullYear()-18),
       cutOffdate = new Date(eighteenYearsAgo),
       date =  cutOffdate.getDate(),
       month = cutOffdate.getMonth()+1,
       year = cutOffdate.getFullYear();
        return date+"/"+month+"/"+year;
    },

    updateMultiFileBtnStateForInvestor: function (ref) {
      if (ref.find(".file-wrapper .upload").length >= ref.data('max-length')) {
        ref.find(".upload-image-btn").attr("disabled", "disabled");
        ref.find(".reached-max-limit").css('display', '');

      } else {
        ref.find(".upload-image-btn").removeAttr("disabled");
        ref.find(".reached-max-limit").css('display', 'none');
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
              oThis.formHelper.showServerErrors( response );
            }
            onErrorCallback && onErrorCallback(response);
          } else {
            onValidCallback && onValidCallback(response);
          }
        }
      });
    },

    validateForm: function () {
      var isFormValid = false ,  isCaptachValid = false , isInputFilesValid = false,
          errMsg = "";

      utilities.clearErrors( oThis.$kycForm );
      isFormValid = oThis.formHelper.jForm.valid();
      isCaptachValid = utilities.validateCaptcha( oThis.$kycForm );
      oThis.formNames.forEach(function (value) {
        oThis.$kycForm.find('input[name="' + value + '"]').trigger('change');
        if (oThis.$kycForm.find('input[name="' + value + '"]').length == 0) {
          errMsg = oThis.$kycForm.find('[data-name="' + value + '"]').data('title') + ' is required';
          $('.error[data-forid="'+value+'"]').text(errMsg);
        }
      });

      if( oThis.$kycForm.find('.error:not(:empty)').length == 0 ){
        isInputFilesValid =  true
      }

      if ( isFormValid && isCaptachValid && isInputFilesValid ) {
        //Disbale the Submit Button
        oThis.setBtnProcessState();

        //Validate Eth Address
        var ethAddress = oThis.$kycForm.find('input[name="ethereum_address"]');
        if(ethAddress.length > 0){
          oThis.isValidAddress(ethAddress.val(),
            function () { /* Success Callback */
              //Form is now valid
              oThis.onFormValid();
            }, function () { /* Error Callback */
              //Form has Errors..
              oThis.onFormError();
            });
        } else {
            oThis.onFormValid();
        }
      } else{
        oThis.$kycForm.find('.general_error')
          .addClass("is-invalid")
          .text('We found some errors in your KYC form. Please scroll up to review');
      }

    },

    setBtnProcessState : function () {
      var preSubmitText = oThis.jKYCSubmit.text();
      oThis.jKYCSubmit.data('pre-submit-text', preSubmitText );
      oThis.jKYCSubmit.prop("disabled", true).text("SUBMITTING...");
    },

    resetButton: function () {
      var preSubmitText = oThis.jKYCSubmit.data('pre-submit-text');
      oThis.jKYCSubmit.prop("disabled", false).text(preSubmitText);
    },

    onFormValid: function () {
      oThis.resetButton();
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
      oThis.resetButton();
      if (typeof grecaptcha != 'undefined') {
        grecaptcha.reset();
      }
      oThis.$kycForm.find('.general_error')
        .addClass("is-invalid")
        .text('We found some errors in your KYC form. Please scroll up to review');
    },

    makeFileParams: function () {

      var fileParams = {images: {}, pdfs: {}};
      var formSelectors = [];

      oThis.formNames.forEach(function (value) {
        formSelectors.push($('#kycForm input[name="' + value + '"]'));
      });

      $.each(formSelectors, function (index, v) {
        $.each(v, function (index, value) {

          var jqueryObj = $(value);

          var file_type = jqueryObj[0].files[0].type;
          var file_name = jqueryObj[0].name;

          var sanitizedfileName = file_name.replace('[]', '');
          var file_category = '';

          if (file_type.substr(0, 5) == 'image') {
            file_category = 'images';
          } else if ("application/pdf".substr(-3) == 'pdf') {
            file_category = 'pdfs';
          }

          if (sanitizedfileName === 'investor_proof_files_path') {
            var usedInputName = jqueryObj.data('input-used-name');
            fileParams[file_category][usedInputName] = file_type;
          } else {
            fileParams[file_category][sanitizedfileName] = file_type;
          }
        });
      });

      return fileParams;
    },

    getSignedUrls: function () {

      oThis.verifyModal('loader');
      oThis.verifyModal('hide-close');
      oThis.verifyModal('hide-progress');
      oThis.verifyModal('status-text', 'Encrypting your upload data...');

      $.ajax({
        url: '/api/user/upload-params',
        data: oThis.makeFileParams(),
        success: function (response) {
          if (response.success === true) {
            oThis.uploadParamsResponse = response.data;
            oThis.uploadFiles(oThis.uploadParamsResponse);
          } else {
            grecaptcha.reset();
            oThis.verifyModal('show-close');
            oThis.verifyModal('status-text', response.err.display_text);
            oThis.formHelper.showServerErrors( response );
          }
        },
        error: function (jqXHR, exception) {
          oThis.formHelper.showServerErrors( exception );
        }
      })
    },

    uploadFiles: function (data) {

      oThis.verifyModal('show-progress');
      oThis.verifyModal('status-text', 'We are uploading the file via a secure channel.<br /> This might take sometime, please do not refresh the page.');

      $.each(data, function (upload_key, upload_value) {
        var inputObj;

        if (upload_key.match("^investor_proof_files_path_")) {
          inputObj = $('#kycForm input[data-input-used-name=' + upload_key + ']');
        } else {
          inputObj = $('#kycForm input[name=' + upload_key + ']');
        }
        $('#fileupload').fileupload('send', {
          files: [inputObj[0].files[0]],
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
        if (upload_key.match("^investor_proof_files_path_")) {
          if (!$data["investor_proof_files_path"]) {
            $data["investor_proof_files_path"] = []
          }
          $data["investor_proof_files_path"].push(upload_value.fields.key);
        } else {
          $data[upload_key] = upload_value.fields.key;
        }
      });

      $.ajax({
        url: $form.attr('action'),
        dataType: 'json',
        method: $form.attr('method'),
        data: $data,
        success: function (response) {
          if (response.success == true) {
            //window.location = '/dashboard';
            oThis.verifyModal('hide-verifyModal');
            oThis.showKycSuccessDialog();
            return false;
          } else {
            grecaptcha.reset();
            oThis.verifyModal('hide-verifyModal');
            //oThis.verifyModal('status-text', response.err.display_text);
            oThis.showKycUpdateFailedDialog();
            oThis.formHelper.showServerErrors( response );
          }
        },
        error: function (jqXHR, exception) {
          grecaptcha.reset();
          oThis.verifyModal('hide-verifyModal');
          oThis.showKycUpdateFailedDialog();
        }
      });
    },

    verifyModal: function (mode, response ) {

      var message;
      if( typeof response == "string"){
        message = response
      }else {
        message = response && response.err && response.err.display_text;
      }

      $verifyModal = $('#verifyModal');

      if (typeof mode == 'undefined') {
        $verifyModal.modal({
          backdrop: 'static',
          keyboard: false
        }).modal('show');
      }

      if (mode == 'hide-verifyModal') {
        $verifyModal.modal({
          backdrop: 'static',
          keyboard: false
        }).modal('hide');
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
        $verifyModal.find('.loader-content .status').html(message);
      }

    },

    showKycSuccessDialog: function () {
      $kycSuccessModel = $('#kycSuccessModel');

      $kycSuccessModel.modal({
        backdrop: 'static',
        keyboard: false
      }).modal('show');
    },

    showKycUpdateFailedDialog: function () {
      $kycUpdateFailedModel = $('#kycUpdateFailedModel');

      $kycUpdateFailedModel.modal({
        backdrop: 'static',
        keyboard: false
      }).modal('show');
    },

    hideKycUpdateFailedDialog: function () {
      $kycUpdateFailedModel = $('#kycUpdateFailedModel');

      $kycUpdateFailedModel.modal({
        backdrop: 'static',
        keyboard: false
      }).modal('hide');
    },

    addFormName: function (formName) {
      var formNameIndex = oThis.formNames.indexOf(formName);
      if (formNameIndex === -1) {
        oThis.formNames.push(formName);
      }
    },

    removeFormName: function (formName) {
      var formNameIndex = oThis.formNames.indexOf(formName);
      oThis.formNames.splice(formNameIndex, 1)

    }


  };

})(window);