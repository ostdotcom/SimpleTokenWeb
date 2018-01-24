;
(function (window) {

  var homeNs = ns("simpletokenadmin.home"),
    adminUtilsNs = ns("simpletokenadmin.utils"),
    oThis;

  homeNs.common = oThis = {

    fireGetCases: null,

    init: function (config) {
      oThis.initGrid();
      oThis.bindButtonActions();
    },

    initGrid: function (config) {

    },

    bindButtonActions: function (config) {

      $("#searchCase").on('keyup', function (e) {
        if (!oThis.fireGetCases) {
          oThis.fireGetCases = setTimeout(function () {
            oThis.getRelatedCases();
            oThis.fireGetCases = null
          }, 500);
        }

      });

    },

    getRelatedCases: function () {
      $caseSearchResults = $('#caseSearchResults');
      var query_term = $("#searchCase").val();
      if (query_term.length <= 3) {
        return false;
      }
      $caseSearchResults.hide();

      $.ajax({
        url: '/api/admin/kyc/get-cases-by-email',
        dataType: 'json',
        method: 'GET',
        data: {
          query: $("#searchCase").val()
        },
        success: function (response) {
          if (response.success == true) {
            //Fill values in search box and show.

            resultData = '';
            if (!response.data) {
              resultData += '<span class="searchResultElement" style="text-align:center" > No User Found</span>';
            }
            else {
              for (var case_id in response.data) {
                resultData += '<a class="searchResultElement" href="/admin/get-kyc-details/?case_id=' + case_id + '"> CASE ' + case_id + '( ' + response.data[case_id] + ' )</a>';
              }
            }

            $caseSearchResults.html(resultData);
            $caseSearchResults.show();
          } else {
            $('.error[data-for="action_error"]').text(response.err.display_text).fadeIn(10).fadeOut(8000);
          }
        },
        error: function (jqXHR, exception) {
          adminUtilsNs.errorHandling.xhrErrResponse(jqXHR, exception);
        }
      });
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);