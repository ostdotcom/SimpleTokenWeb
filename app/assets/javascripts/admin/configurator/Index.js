;
(function (window ) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      oThis
  ;

  oSTNs.index = oThis = {

    init: function ( ) {
      formBuilder.init({});
    }

  };


  $(document).ready(function () {
    oThis.init(); //TODO this will be called from erb with backend data.
  });


})(window );