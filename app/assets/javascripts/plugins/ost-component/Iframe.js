;
(function (window ) {

  var oSTNs               = ns("ost"),
      oThis
  ;

  var jLoadableIframe = $('.loadable-iframe') ;

  oSTNs.ostIframe = oThis = {
    
    loadUrlInIframe : function ( jIframe , url ) {
      var iFrame =  jIframe || jLoadableIframe
      ;
      if( url ) {
        iFrame.attr( 'src', url );
      }
    }

  };
  

})(window );