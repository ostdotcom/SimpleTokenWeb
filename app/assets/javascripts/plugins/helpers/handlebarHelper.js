;
(function (window ) {

  var oSTNs = ns("ost"),
    oThis;

  oSTNs.handlebarHelper = oThis = {

    getMarkup: function( selector ,  config  ){
      var sTemplate  = $( selector ),
          sMarkup    = sTemplate.html(),
          jTemplate  = Handlebars.compile( sMarkup ),
          jMarkup    = jTemplate( config )
      ;
      return jMarkup ;
    }

  }

})(window );