;
(function (window , $) {

  var oSTNs = ns("ost"),
    oThis
  ;

  oSTNs.lengthMocker  = oThis = {
    sMock     : '.mock-length' ,
    sMocker   : '.length-mocker',
    sWrapper  : '.form-group',

    initLengthMocker: function ( sMock , sMocker , sWrapper ) {
      var sMock    = sMock    || oThis.sMock ,
          sMocker  = sMocker  || oThis.sMocker,
          sWrapper = sWrapper || oThis.sWrapper

      ;
      $(sMock).off('keyup change').on('keyup change', function () {
        var jParent = $(this).closest(sWrapper),
          jMocker = jParent.find( sMocker ),
          jVal = $(this).val() || "",
          jTrimVal = jVal.trim(),
          jValLength = jTrimVal.length || 0
        ;
        if (jMocker) {
          jMocker.html(jValLength);
        }
      });
    }

  };

})(window , jQuery );