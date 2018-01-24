;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.kycDetails = oThis = {

    oLogTable: null,
    logTableConfig: {},
    adminKycStatuses: {},
    cynopsisKycStatuses: {},
    $kycLogsTable: $('#kycLogsTable'),
    $modalBox: $('#kycDetailsModal'),

    init: function (config) {
      oThis.initGrid();
      oThis.bindButtonActions();
      oThis.logTableConfig = config.logs_table_config;
      oThis.adminKycStatuses = config.admin_kyc_statuses;
      oThis.cynopsisKycStatuses = config.cynopsis_kyc_statuses;
    },

    initGrid: function (config) {
    },

    bindButtonActions: function (config) {
      $('.kyc-image, .fullScreenIcon').on('click', function () {
        if ($(this).find('a').length > 0) {
          return;
        } else {
          oThis.$modalBox.find('.modal-body').html($(this).closest('.kyc-img-block').find('.kyc-img-container').html());
          $('.modal-body iframe').height((window.innerHeight - 100) + 'px');
          $('.modal-body img').css('max-height', (window.innerHeight - 100) + 'px');
          oThis.$modalBox.modal('show');
        }
      });

      $('#openLogs').on('click', function () {
        oThis.getLogs();
      });

      $('#kycDetailsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
      });

      $('#kycCaseActionModal').on('click', 'input[type=radio][name=message_type]', function () {
        if ($('#message_type_standard').prop('checked')) {
          $('#custom_message_text').attr('disabled', true);
        } else {
          $('#custom_message_text').attr('disabled', false);
        }
      });

      $('#openCase').on('click', function (e) {
        oThis.changeAddressAndOpenCase();
      });


      $('.sticky-action-buttons-container').on('click', '.button-active', function () {

        $dataAction = $(this).data('action-url');
        $kycCaseActionModal = $('#kycCaseActionModal');

        var copyMap = {};
        copyMap['/api/admin/kyc/data-mismatch'] = 'Data Mismatch';
        copyMap['/api/admin/kyc/passport-issue'] = 'Document ID Issue';
        copyMap['/api/admin/kyc/selfie-img-issue'] = 'Selfie Issue';
        copyMap['/api/admin/kyc/residency-img-issue'] = 'Residency Image Issue';
        copyMap['/api/admin/kyc/deny-kyc'] = 'Deny KYC';
        copyMap['/api/admin/kyc/qualify'] = 'Qualify';

        if ($dataAction == '/api/admin/kyc/data-mismatch') {
          $kycCaseActionModal.find('.form-fields').html($('#data_mismatch_form').text());
        }

        if ($dataAction == '/api/admin/kyc/passport-issue' || $dataAction == '/api/admin/kyc/selfie-img-issue' || $dataAction == '/api/admin/kyc/residency-img-issue') {
          $kycCaseActionModal.find('.form-fields').html($('#image_mismatch_form').text());
        }

        if ($dataAction == '/api/admin/kyc/deny-kyc' || $dataAction == '/api/admin/kyc/qualify') {
          $kycCaseActionModal.find('.form-fields').html($('#confirm_form').text());
        }

        $kycCaseActionModal.find('.modal-title').text( copyMap[$dataAction] );
        $kycCaseActionModal.find('.title-placeholder').text( copyMap[$dataAction] );

        $('#kycCaseActionModal').modal();

        $('#submit_modal_form').unbind('click').click(function () {
          oThis.formSubmit($dataAction);
        });

      });

    },

    formSubmit: function ($dataAction) {
      if ($dataAction == '/api/admin/kyc/data-mismatch') {
       var fields_selected =  $('#modal_form input[type="checkbox"]:checked').length;
       if (fields_selected == 0)
       {
         alert("please select atleast one reason");
         return false;

       }
      }
      else
        if (($('#message_type_custom').is(':checked')) &&  ($('#custom_message_text').val() == "" )){
          alert("please enter a custom message");
          return false;
        }

      var $form = $('#modal_form');
      $.ajax({
        url: $dataAction,
        dataType: 'json',
        method: $form.attr('method'),
        data: $form.serialize(),
        success: function (response) {
          if (response.success == true) {
            window.location = window.location;
            return false;
          } else {
            $('.error[data-for="action_error"]').text(response.err.display_text).fadeIn(10).fadeOut(8000);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    },

    getLogs: function () {

      if (!oThis.oLogTable) {
        oThis.logTableConfig.ajax.data = function (data) {
          return $.extend(data, {});
        };

        oThis.logTableConfig.columns.unshift(
          {
            title: "Date / Time",
            data: "date_time",
            render: $.fn.dataTable.render.text()
          },
          {
            title: "Agent",
            data: "agent",
            render: $.fn.dataTable.render.text()
          },
          {
            title: "Activity",
            data: "activity",
            render: $.fn.dataTable.render.text()
          }
        );

        oThis.oLogTable = oThis.$kycLogsTable.DataTable(oThis.logTableConfig);
      }

      $('#kycLogsModal').modal('show');
    },

    getDuplicateKycs: function (case_id) {
      $.ajax({
        url: '/api/admin/kyc/fetch-duplicate',
        dataType: 'json',
        method: 'GET',
        data: {case_id: case_id},
        success: function (response) {
          if (response.success == true) {
            $duplicateKycData = $('#dupDataTable tbody');
            var totalRows = 0;
            for (var userId in response.data) {
              var dataRow = response.data[userId];

              var displayRow = ''
                + '<tr class="duplicateCase' + (dataRow.active.length == 0 ? '' : ' activeStatus') + '">'
                + '<td class="dupInfo"><a target="_blank" href="/admin/get-kyc-details/?case_id=' + dataRow.case_id + '">' + dataRow.case_id + '</td>'
                + '<td class="dupInfo">' + oThis.adminKycStatuses[dataRow.admin_status] + '</td>'
                + '<td class="dupInfo">' + oThis.cynopsisKycStatuses[dataRow.cynopsis_status] + '</td>'
                + '<td class="dupInfo">' + dataRow.active + '</td>'
                + '<td class="dupInfo">' + dataRow.inactive + '</td>'
                + '</tr>';

              totalRows++;
              $duplicateKycData.append(displayRow);
            }

            if (totalRows == 0) {
              $('.duplicate-kyc-data').remove();
            }
            return false;
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    },

    changeAddressAndOpenCase: function () {

      var ethereum_address = $("#openCaseInput").val();
      var is_case_closed = $("#openCase").data("iscaseclosed");

      if (!is_case_closed && !ethereum_address) {
        alert('please enter the new ETH address');
        return false;
      }

      var text_message = "";



      if (is_case_closed) {
        text_message = "By confirming this case will be reopened in approx 10 minutes, and if a new ETH address was provided it will be updated.";
      }
      else {
        text_message = "By confirming the ETH address provided will be updated.";
      }

      if (!confirm(text_message)) {
        return false;
      }

      var $form = $('#openCaseFrm');
      $.ajax({
        url: '/api/admin/kyc/change-address-and-open-case',
        dataType: 'json',
        method: 'POST',
        data: $form.serialize(),
        success: function (response) {
          if (response.success == true) {
            $('.success[data-for="action_success"]').text("Request Taken. Please check after sometime.").fadeIn(10).fadeOut(10000);
            $('#openCaseInput').val('');
          } else {
            $form.find('.error[data-for="action_error"]').text(response.err.display_text).fadeIn(10).fadeOut(8000);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    }

  };
})(window);