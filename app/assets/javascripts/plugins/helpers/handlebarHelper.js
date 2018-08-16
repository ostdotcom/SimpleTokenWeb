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

  var idCount = 1 ;
  Handlebars.registerHelper('configurator_component_id', function( name, isSameId , options ) {
    if( isSameId !== true ) {  //This should be exactly checked.
      idCount++
    }
    if( name ){
      return name + "_" + idCount ;
    }else {
      return "no_name" + "_" + idCount ;
    }
  });

})(window );