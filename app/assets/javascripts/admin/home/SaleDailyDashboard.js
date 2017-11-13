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
    tabType: null,

    init: function (config) {

      oThis.tabType = config.tab_type;

      oThis.initGrid(config.table_config);
      oThis.bindButtonActions();
    },

    initGrid: function (config) {

      config.ajax.data = function (data) {
        return $.extend(data, {tab_type: oThis.tabType});
      };

      config.ajax.error = function (jqXHR, textStatus, errorThrown) {
        adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, errorThrown);
      };

      config.ajax.dataSrc = function(response) {
        oThis.allTimeData = response.all_time_data;
        return response.data;
      };

      config.columns.unshift(

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
          title: "USD <br> <span id='totalDollarVal' class='totalSaleValue'></span>",
          data: "total_dollar_value",
          render: $.fn.dataTable.render.text()
        }
      );

      if(oThis.tabType=='date') {
        config.columns.unshift(
          {
            title: "Date (PST)",
            data: "date_pst",
            render: $.fn.dataTable.render.text()
          }
        );
      }else{
        config.columns.unshift(
          {
            title: "Sale Day",
            data: "day_no",
            render: $.fn.dataTable.render.text()
          }
        );
      }

      oThis.oTable = oThis.$dataTable.DataTable(config);

    },

    bindButtonActions: function (config) {
      oThis.$dataTable.on('draw.dt', function () {
        $('#totalDollarVal').text('$ ' + oThis.allTimeData.total_dollar_value);
        $('#totalEthers').text(oThis.allTimeData.total_ethereum);
        $('#totalTokensSold').text(oThis.allTimeData.total_tokens_sold);
      });

      $('#tabType').on('change', function (e) {
        oThis.tabType = $(this).val();
        oThis.changePageUrl();
      });
    },

    changePageUrl: function () {
      var newUrl = window.location.origin + window.location.pathname + '?' + jQuery.param({tab_type: oThis.tabType});
      window.location = newUrl;
    }

  };

})(window);