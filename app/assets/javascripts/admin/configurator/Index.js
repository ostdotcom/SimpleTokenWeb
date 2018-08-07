;
(function (window ) {

  var oSTNs           = ns("ost"),
      ostFileUploader = ns('ost.ostFileUploader'),
      oThis
  ;

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
        'accept'      : "image/*",
        'name'        : "company_logo",
        'signed_url'  : "/api/admin/configurator/upload-params"
      };

      var sTemplate  = $('#ost-file-uploader'),
        sMarkup    = sTemplate.html(),
        jTemplate  = Handlebars.compile( sMarkup ),
        jMarkup    = jTemplate( fileUploaderConfig ),
        jWrapper   = $('.jCollapseContainer')
      ;

      jWrapper.append( jMarkup );
      ostFileUploader.bindButtonActions();
    }
  };


  $(document).ready(function () {
    oThis.init(); //TODO this will be called from erb with backend data.
  });


})(window );