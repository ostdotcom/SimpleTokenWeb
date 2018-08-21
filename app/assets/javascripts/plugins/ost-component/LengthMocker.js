;
(function (window , $) {

  var oSTNs = ns("ost"),
    oThis
  ;

  oSTNs.lengthMocker  = oThis = {
    sMock     : '.mock-length' ,
    sMocker   : '.length-mocker',
    sWrapper  : '.form-group',
    events    : 'keyup.lengthMocker change.lengthMocker',

    initLengthMocker: function ( sMock , sMocker , sWrapper , events) {
      var sMock    = sMock    || oThis.sMock ,
          sMocker  = sMocker  || oThis.sMocker,
          sWrapper = sWrapper || oThis.sWrapper,
          events   = events   || oThis.events
      ;
      $(sMock).off(events).on(events, function () {
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