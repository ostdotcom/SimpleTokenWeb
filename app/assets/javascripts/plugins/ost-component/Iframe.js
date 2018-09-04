;
(function (window ) {

  var oSTNs               = ns("ost"),
      oThis
  ;

  var jLoadableIframe = $('.loadable-iframe') ;

  oSTNs.ostIframe = oThis = {
    
    loadUrlInIframe : function ( url , jIframe  ) {
      var iFrame =  jIframe || jLoadableIframe
      ;
      if( url ) {
        iFrame.attr( 'src', url );
      }
    }

  };
  

})(window );