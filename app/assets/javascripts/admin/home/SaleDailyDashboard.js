;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.saleDailyDashboard = oThis = {

    oTable: null,
    page: 0,
    $dataTable: $('#saleDashboard'),
    allTimeData: {},

    init: function (config) {
      oThis.initGrid(config.table_config);
      oThis.bindButtonActions();
    },

    initGrid: function (config) {

      config.ajax.error = function (jqXHR, textStatus, errorThrown) {
        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, errorThrown);
      };

      config.ajax.dataSrc = function(response) {
        oThis.allTimeData = response.all_time_data;
        return response.data;
      };

      config.columns.unshift(
        {
          title: "Date (PST)",
          data: "date_time",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Total Etherium <br> <span id='totalEthers' class='totalSaleValue'></span>",
          data: "total_ethereum",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Total Tokens Sold <br> <span id='totalTokensSold' class='totalSaleValue'></span>",
          data: "total_tokens_sold",
          render: $.fn.dataTable.render.text()
        },
        {
          title: "Dollor value ($) <br> <span id='totalDollarVal' class='totalSaleValue'></span>",
          data: "total_dollars_value",
          render: $.fn.dataTable.render.text()
        }
      );
      oThis.oTable = oThis.$dataTable.DataTable(config);

    },

    bindButtonActions: function (config) {
      oThis.$dataTable.on('draw.dt', function () {
        $('#totalDollarVal').text('$ ' + oThis.allTimeData.total_dollars_value);
        $('#totalEthers').text(oThis.allTimeData.total_ethereum);
        $('#totalTokensSold').text(oThis.allTimeData.total_tokens_sold);
      });
    }

  };

})(window);