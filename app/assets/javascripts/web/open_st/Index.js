;
(function (window) {

  var openSTNs = ns("open_st"),
      oThis;

  openSTNs.index = oThis = {

    init: function (config) {
      window.alert('Hi From Open ST');
    }

  };

  $(document).ready(function () {
    oThis.init({i18n: {}});
  });

})(window);