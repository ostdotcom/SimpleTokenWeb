;
(function (window , $) {

  var oSTNs = ns("ost"),
      oThis;

  oSTNs.ostFileUploader = oThis = {
    sElement      : ".file-upload-input",
    dSignedUrl    : "get-signed-url",
    fileTypeEnum  : {
      "images" : "images",
      "pdfs"   : "pdfs"
    },


    init: function ( ) {
      oThis.bindButtonActions();
    },

    bindButtonActions: function () {
      $( oThis.sElement ).on('change' , function ( e ) {
        var jEl = $(this);
        oThis.getSignedUrl( jEl );
      });
    },

    getSignedUrl : function ( jEl ) {
      var action  = jEl.data( oThis.dSignedUrl )
      ;

      $.ajax({
        url: '/api/user/upload-params',
        data: oThis.getParams( jEl ),
        success : function ( res ) {
          oThis.onSignedSuccess( res );
        },
        error: function (jqXHR, exception) {
          oThis.error( exception );
        }
      });
    },

    getParams : function ( jEl ) {

    },

    onSignedSuccess : function ( responses ) {
      if( responses.success ){

      }
    },

    onSignedError : function ( jqXHR, exception ) {

    }


};

  oThis.init();

})(window , jQuery);