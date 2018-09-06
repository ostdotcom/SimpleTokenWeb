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

    bindLengthMocker: function ( ) {
      $(oThis.sMock).off(oThis.events).on(oThis.events, function () {
        oThis.updateLength( $(this) );
      });
    },

    updateLength : function ( jEl ) {
      if( !jEl ) return ;
      var jParent     = jEl.closest(oThis.sWrapper),
          jMocker     = jParent.find( oThis.sMocker ),
          jVal        = jEl.val() || "",
          jTrimVal    = jVal.trim(),
          jValLength  = jTrimVal.length || 0
      ;
      if (jMocker) {
        jMocker.html(jValLength);
      }
    },

    setInitialLengths : function () {
      var jEls = $( oThis.sMock );
      for(var cnt = 0 ;  cnt  < jEls.length ;  cnt++ ) {
        oThis.updateLength( jEls.eq( cnt ) );
      }
    }

  };

})(window , jQuery );