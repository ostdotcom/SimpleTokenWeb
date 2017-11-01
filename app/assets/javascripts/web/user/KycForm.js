;
(function (window) {

  var homeNs = ns("simpletoken.home"),
      utilsNs = ns("simpletoken.utils"),
    oThis;

  homeNs.kyc = oThis = {

      uploadParamsResponse: {},
      uploadCount: 0,
      isChinese: false,
      currentPercent: 0,
      formNames: ['passport_file_path','selfie_file_path'],
      popoverPlacement: 'right',
      $kycForm: $('#kycForm'),

      init: function (config) {
          oThis.config = config;
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
                  $.each(oThis.uploadParamsResponse, function(upload_key, upload_value){
                      if(upload_value.fields.key == data.formData.key){
                          oThis.uploadParamsResponse[upload_key].status = data.jqXHR.status;
                      }
                  });
                  oThis.uploadCount--;
                  if(oThis.uploadCount == 0){
                      oThis.submitData();
                  }
              },
              progress: function(e, data){
                  var percent = Math.round((data.loaded / data.total) * 100);
                  if(oThis.currentPercent < percent){
                      oThis.currentPercent = percent;
                      $('#verifyModal .loader-content .progress .progress-bar')
                          .css('width', percent + '%')
                          .text(percent + '%');
                  }
              },
              error: function(jqXHR, exception) {
                  oThis.verifyModal('show-close');
                  oThis.verifyModal('hide-progress');
                  oThis.verifyModal('status-text', utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
              },
              fail: function(e, data) {
                  var xmlResponse = $( data.jqXHR.responseXML );
                  oThis.verifyModal('show-close');
                  oThis.verifyModal('hide-progress');
                  oThis.verifyModal('status-text', 'Upload Error: '+xmlResponse.find('Code').text()+'. Please contact support.');
              },
          });

          oThis.$kycForm.find('input[name=birthdate]')
              .datepicker({
                  format: 'dd/mm/yyyy',
                  autoclose: true,
                  startDate: '01/01/1900',
                  endDate: '01/11/1999',
                  orientation: 'bottom'
              })
              .on('changeDate', function(e) {
                  $(this).trigger('change');
              });

          oThis.$kycForm.find('select[name="nationality"]').on('changed.bs.select', function (e) {
              if($(this).val() == 'CHINESE'){
                  oThis.isChinese = true;
                  $('.residence-proof').show();
                  oThis.formNames.push('residence_proof_file_path');
              } else {
                  oThis.isChinese = false;
                  $('.residence-proof').hide();
                  if(oThis.formNames.length == 3) {oThis.formNames.pop()}
              }
          });

          oThis.$kycForm.find('input').change(function(){
              $(this).removeClass('border-error');
              $(this).closest('.form-group').find('.error[data-for]').text('');
          });

          oThis.$kycForm.find('input[type="file"]').change(function(){
              $(this).closest('.form-group').find('.file-name').text($(this).val().split('\\').pop());
          });

          //oThis.$kycForm.find('input[name="ethereum_address"]').change(function(){
          //    if(this.validity.patternMismatch === false){
          //        oThis.isValidAddress( $(this).val() );
          //    }
          //});

          $("#kycSubmit").click(function (event) {
              event.preventDefault();
              oThis.validateForm();
          });

          if($(window).width() < 767){
              oThis.popoverPlacement = 'bottom'
          }

          oThis.$kycForm.find('label[for=passport_file_path] .badge').popover({
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

          $('#kycVerify').click(function(){
             if($('#verifyModal input:checkbox:checked').length == $('#verifyModal input:checkbox').length) {
                 simpletoken.utils.errorHandling.clearFormErrors();
                 oThis.getSignedUrls();
             } else {
                 $('.error[data-for="verify_error"]').text('Please verify all above mentioned confirmations');
             }
          });

          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
              $('.selectpicker').selectpicker('mobile');
          }

      },

      refreshIndicator: function(){
          var $refresh = $('#refresh-indicator');
          $refresh.val() == 'yes' ? location.reload(true) : $refresh.val('yes');
      },

      isValidAddress: function(address, onValidCallback, onErrorCallback){
          $.ajax({
              url: '/api/user/check-ethereum-address',
              data: {
                  'ethereum_address': address
              },
              success: function(response){
                  if((response.success === false) || (response.err != undefined && response.err != '')){
                      if(typeof response.err.error_data != undefined){
                          oThis.$kycForm.find('.error[data-for="ethereum_address"]').text(response.err.error_data.ethereum_address);
                      }
                      onErrorCallback && onErrorCallback( response );
                  } else {
                      onValidCallback && onValidCallback( response );
                  }
              }
          });
      },

      validateForm: function(){

          simpletoken.utils.errorHandling.clearFormErrors();

          oThis.$kycForm.find('input[type="file"]').attr('required',false);

          oThis.formNames.forEach(function(value){
              oThis.$kycForm.find('input[name="'+value+'"]').attr('required',true);
          });

          oThis.$kycForm.find('input, select, textarea').each(function(){
              $(this).trigger('change');
          });

          if(typeof oThis.$kycForm.find('.g-recaptcha')[0] != 'undefined' && typeof grecaptcha  != 'undefined'){
              if(grecaptcha.getResponse() == ''){
                  oThis.$kycForm.find('.error[data-for="recaptcha"]').text('Please select the reCaptcha checkbox');
              }
          }

          if(oThis.$kycForm.find('.error:not(:empty)').length == 0) {
              simpletoken.utils.errorHandling.clearFormErrors();
              //Validate Eth Address
              var ethAddress = oThis.$kycForm.find('input[name="ethereum_address"]').val();
              oThis.isValidAddress(ethAddress,
                  function () { /* Success Callback */
                    oThis.onFormValid();
                  }, function () { /* Error Callback */
                      oThis.onFormError();
                  });

          } else {
              oThis.onFormError();
          }

      },
      onFormValid: function () {
          simpletoken.utils.errorHandling.clearFormErrors();

          if(oThis.config.is_update === true){
              // Show verify modal only for progress and start upload process
              oThis.verifyModal();
              oThis.getSignedUrls();

          } else {

              // Show verify modal with checkboxes
              oThis.verifyModal();
              oThis.verifyModal('verify');

          }
      },
      onFormError: function () {
          if(typeof grecaptcha  != 'undefined'){
              grecaptcha.reset();
          }
          oThis.$kycForm.find('.error[data-for="general_error"]').text('We found some errors in your KYC form. Please scroll up to review');
      },

      makeFileParams: function(){
          var fileParams = '';
          var formSelectors = [];

          oThis.formNames.forEach(function(value){
              formSelectors.push('#kycForm input[name="'+value+'"]');
          });

          $.each( $(formSelectors.join(',')), function(key, value){

              var file_type = value.files[0].type;
              var file_name = value.name;

              if(file_type.substr(0,5) == 'image'){
                  var file_category = 'images';
              } else if("application/pdf".substr(-3) == 'pdf'){
                  var file_category = 'pdfs';
              }

              fileParams += file_category + '[' + file_name + ']=' + file_type + '&';

          });

          return fileParams;
      },

      getSignedUrls: function(){

          oThis.verifyModal('loader');
          oThis.verifyModal('hide-close');
          oThis.verifyModal('hide-progress');
          oThis.verifyModal('status-text', 'Encrypting your upload data...');

          $.ajax({
              url: '/api/user/upload-params/?'+oThis.makeFileParams(),
              success: function(response){
                  if(response.success === true){
                      oThis.uploadParamsResponse = response.data;
                      oThis.uploadFiles(oThis.uploadParamsResponse);
                  }
              }
          })
      },

      uploadFiles: function(data){

          oThis.verifyModal('show-progress');
          oThis.verifyModal('status-text', 'Uploading files via secured channel...');

          $.each(data, function(upload_key, upload_value){
              $('#fileupload').fileupload('send', {
                  files:[$('#kycForm input[name='+upload_key+']')[0].files[0]],
                  paramName: ['file'],
                  url: upload_value.url,
                  formData: upload_value.fields
              });
              oThis.uploadCount++;
          });
      },

      submitData: function(){

            oThis.verifyModal('hide-progress');
            oThis.verifyModal('status-text', 'Submitting your KYC data...');

            var $form = $('#kycForm');
            var $data = $form.serializeArray().reduce(function(obj, item) {
                  obj[item.name] = item.value;
                  return obj;
            }, {});
            $.each(oThis.uploadParamsResponse, function(upload_key, upload_value){
                $data[upload_key] = upload_value.fields.key;
            });

            $.ajax({
                url: $form.attr('action'),
                dataType: 'json',
                method: $form.attr('method'),
                data: $data,
                success: function (response) {
                    if (response.success == true) {
                        window.location = '/reserve-token';
                        return false;
                    } else {
                        grecaptcha.reset();
                        oThis.verifyModal('show-close');
                        oThis.verifyModal('status-text', response.err.display_text);
                        simpletoken.utils.errorHandling.displayFormErrors(response);
                    }
                },
                error: function (jqXHR, exception) {
                    grecaptcha.reset();
                    oThis.verifyModal('show-close');
                    oThis.verifyModal('status-text', utilsNs.errorHandling.xhrErrResponse(jqXHR, exception));
                }
            });
      },

      verifyModal: function(mode, message){

          $verifyModal = $('#verifyModal');

          if(typeof mode == 'undefined'){
              $verifyModal.modal({
                  backdrop: 'static',
                  keyboard: false
              }).modal('show');
          }

          if(mode == 'verify'){
              $verifyModal.find('.verify-content').show();
              $verifyModal.find('.loader-content').hide();
              $verifyModal.find('.close').show();
              $verifyModal.find('input:checkbox').prop('checked',false);
          }

          if(mode == 'loader'){
              $verifyModal.find('.verify-content').hide();
              $verifyModal.find('.loader-content').show();
          }

          if(mode == 'hide-close'){
              $verifyModal.find('.close').hide();
          }

          if(mode == 'show-close'){
              $verifyModal.find('.close').show();
          }

          if(mode == 'hide-progress'){
              $verifyModal.find('.loader-content .progress').hide();
              $verifyModal.find('.loader-content .progress .progress-bar')
                  .css('width', '1%')
                  .text('');
          }

          if(mode == 'show-progress'){
              $verifyModal.find('.loader-content .progress').show();
          }

          if(mode == 'status-text'){
              $verifyModal.find('.loader-content .status').text(message);
          }

      }

  };

})(window);