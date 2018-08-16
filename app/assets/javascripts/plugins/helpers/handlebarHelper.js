;
(function (window ) {

  var oSTNs = ns("ost"),
    oThis;

  oSTNs.handlebarHelper = oThis = {

    getMarkup: function( selector ,  config  ){
      var config     = config     || {},
          sTemplate  = selector   && $( selector ),
          sMarkup    = sTemplate  && sTemplate.html(),
          jTemplate  = sMarkup    && Handlebars.compile( sMarkup ),
          jMarkup    = jTemplate  && jTemplate( config )
      ;
      return jMarkup || "" ;
    }

  };

  //Remove this later.
  Handlebars.registerHelper('is_required', function(data, options ) {
    if( data == 1 ){
      return "required";
    }else {
      return "";
    }
  });

  Handlebars.registerHelper('ifTooltip', function(tooltip, options ) {
    if( !!tooltip ){
      return options.fn(this);
    }

    return options.inverse(this);
  });

  Handlebars.registerHelper('ifDataKindArray', function( dataKind , options ) {
    if( dataKind && dataKind == "array" ){
      return options.fn(this);
    }
    return options.inverse(this);
  });

  (function (){
    var idTs = Date.now();
    Handlebars.registerHelper('generateId', function ( isSameId ) {
      if( isSameId !== true ){
        idTs++;
      }
      return "c_" + idTs + "_id";
    })
  })()

})(window );