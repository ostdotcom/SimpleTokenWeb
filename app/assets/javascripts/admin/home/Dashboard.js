;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.dashboard = oThis = {

    oTable: null,
    page: 0,
    filters: {},
    sortings: {},
    $dataTable: $('#kycCheckDashboard'),

    init: function (config) {
      oThis.filters = config.filters;
      oThis.sortings = config.sortings;
      oThis.initGrid(config.kyc_table_config);
      oThis.bindButtonActions();
    },

    initGrid: function (config) {

      config.ajax.data = function (data) {
        return $.extend(data, {filters: oThis.filters}, {sortings: oThis.sortings});
      };

      config.ajax.error = function (jqXHR, textStatus, errorThrown) {
        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, errorThrown);
      };

      config.columns.unshift(
        {
          title: "Date / Time",
          data: "date_time",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Status ST",
          data: "status_st",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Status Cynopsis",
          data: "status_cy",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Duplicate",
          data: null,
          "render": function (data, type, full, meta) {
            return '<div class="' + (data.duplicate==0 ? 'bigGreenDot' : 'bigRedDot') + '"></div>';
          }
        },
        {
          title: "Re-Submitted",
          data: null,
          "render": function (data, type, full, meta) {
            return '<div class="' + (data.re_submitted==0 ? "bigGreenDot" : "bigRedDot") + '"></div>';
          }
        },
        {
          title: "Name",
          data: "name",
          render: $.fn.dataTable.render.text(),
          className: 'text-break'
        },
        {
          title: "Country",
          data: "country",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Nationality",
          data: "nationality",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Admin",
          data: "admin",
          render: $.fn.dataTable.render.text()
        }
      );
      oThis.oTable = oThis.$dataTable.DataTable(config);

    },

    bindButtonActions: function (config) {

      $("#cynopsis-status").on('change', function () {
        oThis.filters.cynopsis_status = $(this).val();
        oThis.oTable.ajax.reload(null, true);
        oThis.changePageUrl();
      });

      $("#admin-status").on('change', function () {
        oThis.filters.admin_status = $(this).val();
        oThis.oTable.ajax.reload(null, true);
        oThis.changePageUrl();
      });

      $("#admin-action-type").on('change', function () {
        oThis.filters.admin_action_type = $(this).val();
        oThis.oTable.ajax.reload(null, true);
        oThis.changePageUrl();
      });

      $("#sort-order").on('change', function () {
        oThis.sortings.sort_order = $(this).val();
        oThis.oTable.ajax.reload(null, true);
        oThis.changePageUrl();
      });

      oThis.$dataTable.on('click', 'tbody tr', function () {
        oThis.changePageUrl();
        var pageInfo = oThis.oTable.page.info();
        window.location = '/admin/get-kyc-details/?case_id=' + oThis.oTable.row(this).data().user_case_id + '&' + jQuery.param({filters: oThis.filters})+ '&' + jQuery.param({sortings: oThis.sortings}) + '&display_start=' + pageInfo.start;
      });

      oThis.$dataTable.on('start.dt', function ( e, settings, len ) {
        oThis.changePageUrl();
      });

    },

    changePageUrl: function () {
      var pageInfo = oThis.oTable.page.info();
      var newUrl = window.location.origin + window.location.pathname + '?' + jQuery.param({filters: oThis.filters}) + '&' + jQuery.param({sortings: oThis.sortings}) + '&display_start=' + pageInfo.start;
      history.pushState({}, null, newUrl);
    }

  };

})(window);