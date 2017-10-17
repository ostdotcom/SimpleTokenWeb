;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    oThis;

  homeNs.kycDetails = oThis = {

    oLogTable: null,
    logTableConfig: {},
    $kycLogsTable: $('#kycLogsTable'),
    $modalBox: $('#kycDetailsModal'),

    init: function (config) {
      oThis.initGrid();
      oThis.bindButtonActions();
      oThis.logTableConfig = config.logs_table_config;
    },

    initGrid: function (config) {
    },

    bindButtonActions: function (config) {
      $('.kyc-image, .fullScreenIcon').on('click', function () {
        oThis.$modalBox.find('.modal-body').html($(this).closest('.kyc-img-container').html());
        $('.modal-body iframe').height((window.innerHeight - 150) + 'px');
        $('.modal-body img').css('max-height', (window.innerHeight - 150) + 'px');
        oThis.$modalBox.modal('show');
      });

      $('#openLogs').on('click', function () {
        oThis.getLogs();
      });

      $('#kycDetailsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').html('');
      });

      $('.sticky-action-buttons-container').on('click', '.button-active', function () {
        var r = confirm('Please confirm the action !!')
          , that = this;
        if (r == true) {
          var $form = $('#caseActionForm');
          $.ajax({
            url: $(that).data('action-url'),
            dataType: 'json',
            method: $form.attr('method'),
            data: $form.serialize(),
            success: function (response) {
              if (response.success == true) {
                window.location = window.location;
                return false;
              }
            },
            error: function (jqXHR, exception) {
            }
          });
        }
      });

    },

    getLogs: function () {

      if(!oThis.oLogTable){
        oThis.logTableConfig.ajax.data = function (data) {
          return $.extend(data, {});
        };

        oThis.logTableConfig.columns.unshift(
          {
            title: "Date / Time",
            data: "data_time",
            render: $.fn.dataTable.render.text(),
            width:'10%'
          },
          {
            title: "Status",
            data: "status_a",
            render: $.fn.dataTable.render.text(),
            width:'10%'
          },
          {
            title: "Agent",
            data: "agent",
            render: $.fn.dataTable.render.text(),
            width:'10%'
          },
          {
            title: "Email Type",
            data: "email_type",
            render: $.fn.dataTable.render.text()
          }
        );

        oThis.oLogTable = oThis.$kycLogsTable.DataTable(oThis.logTableConfig);
      }

      $('#kycLogsModal').modal('show');
    }

  };
})(window);