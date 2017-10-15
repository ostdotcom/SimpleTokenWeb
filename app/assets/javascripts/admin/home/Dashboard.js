;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
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
        return $.extend(data, {filters: oThis.filters}, {sortings: oThis.sortings}, {page: 4});
      };

      config.columns.unshift(
        {
          title: "Date / Time",
          data: null,
          "render": function (data, type, full, meta) {
            return data.date_time;
          }

        },
        {
          title: "Status ST",
          data: null,
          "render": function (data, type, full, meta) {
            return data.status_st;
          }
        },
        {
          title: "Status Cynopsys",
          data: null,
          "render": function (data, type, full, meta) {
            return data.status_cy;
          }
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
          data: null,
          "render": function (data, type, full, meta) {
            return data.name;
          }
        },
        {
          title: "Country",
          data: null,
          "render": function (data, type, full, meta) {
            return data.country;
          }
        },
        {
          title: "Nationality",
          data: null,
          "render": function (data, type, full, meta) {
            return data.nationality;
          }
        },
        {
          title: "Admin",
          data: null,
          "render": function (data, type, full, meta) {
            return data.admin;
          }
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
      var newUrl = window.location.origin + window.location.pathname + '?' + jQuery.param(oThis.filters) + '&' + jQuery.param(oThis.sortings) + '&display_start=' + pageInfo.start;
      history.pushState({}, null, newUrl);
    }

  };

})(window);