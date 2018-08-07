;
(function (window ) {

  var oSTNs = ns("ost"),
    oThis;

  oSTNs.index = oThis = {

    init: function ( ) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      oThis.testComponents();
    },


    testComponents: function () {
      var fileUploaderConfig = {
        'label'       : "File Upload",
        'accept'      : "image/*,application/pdf",
        'minBytes'    : "204800",
        'maxBytes'    : "20971520",
        'name'        : "file_uploader"
      };

      var sTemplate  = $('#ost-file-uploader'),
        sMarkup    = sTemplate.html(),
        jTemplate  = Handlebars.compile( sMarkup ),
        jMarkup    = jTemplate( fileUploaderConfig ),
        jWrapper   = $('.jCollapseContainer')
      ;

      jWrapper.append( jMarkup );
    }
  };


  $(document).ready(function () {
    oThis.init(); //TODO this will be called from erb with backend data.
  });


})(window );