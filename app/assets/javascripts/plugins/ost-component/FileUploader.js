;
(function (window , $) {

  var oSTNs                   = ns("ost"),
      configuratorModalConfig = ns("ost.configuratorModalConfig"),
      handlebarHelper         = ns("ost.handlebarHelper"),

      oThis;

  oSTNs.fileUploader = oThis = {
    generalErrorMsg     : "Something went wrong!",

    selector            : ".file-upload-input",
    dSignedUrl          : "get-signed-url",
    dPreUploadMarkup    : "pre-upload-markup",

    sParent             : ".ost-file-uploader-wrap",

    sLabelWrap          : '.input-label-wrapper',
    sProcessingIcon     : '#j-processing-icon',
    sUploadedImageWrap  : "#uploaded-image-wrap",

    fileTypeEnum        : {
      'image' : 'images',
      'pdf'   : "pdfs"
    },

    bindButtonActions: function ( selector  , config ) {
      var jEL = selector ? $(selector) : $(oThis.selector);
      oThis.initFileUploader( jEL  , config );
      jEL.off('change').on('change' , function ( e ) {
        console.log(JSON.stringify(jEL));
        oThis.startUpload( $(this) );
      });
    },

    initFileUploader : function( jEL , config  ){
      var fileUploadConfig = {
              dataType : 'xml',
              method: 'POST',
              success : function ( el ,  res ) {
                el.val( res.url );
              },
              error : function ( el, err ) {
                //oThis.showError( err , el );
              },
              fail : function ( el, reason ) {
                //oThis.showError( reason , el );
              }
      } ;
      if( config ){
        fileUploadConfig = $.extend( true ,  fileUploadConfig , config );
      }
      jEL.fileupload( fileUploadConfig );
    },

    startUpload: function ( jEl ) {
      var jWrapper  = jEl.closest( oThis.sParent ).find( oThis.sLabelWrap),
          preMarkup = jWrapper.html(),
          jMarkup   = $( oThis.sProcessingIcon ).html()
      ;
      oThis.resetError( jEl );
      if( oThis.isValid( jEl ) ){
        jEl.data( oThis.dPreUploadMarkup , preMarkup );
        jWrapper.html( jMarkup );
        oThis.getSignedUrl( jEl );
      }
    },

    isValid : function ( jEl ) {
      var jTarget   = jEl[0] ,
          file      = jTarget.files[0] ,
          size      = file.size,
          name      = file.name,
          minBytes  = jEl.data('min-bytes'),
          maxBytes  = jEl.data('max-bytes'),
          isError   = true,
          maxMb ,
          errorMsg
      ;
      if( minBytes && minBytes > size ){
        isError =  false;
        errorMsg = name + ' file size too small';
        oThis.showError( errorMsg , jEl ) ;
      }else if( maxBytes && maxBytes < size  ){
        isError = false;
        maxMb = maxBytes / (1024*1024);
        errorMsg = jEl.title+' file size too large. Max allowed '+maxMb+' MB';
        oThis.showError( errorMsg , jEl ) ;
      }
      return isError ;
    },

    getSignedUrl : function ( jEl ) {
      var action = oThis.getToSignedApi( jEl )
      ;
      $.ajax({
        url     : action,
        data    : oThis.getParams( jEl ),
        method  : "GET",
        success : function ( res ) {
          oThis.onSignedSuccess( res , jEl );
        },
        error: function ( jqXHR, exception ) {
          oThis.showServerError( exception , jEl );
        }
      });
    },

    getToSignedApi : function ( jEl ) {
      var toSignedApi = jEl.data( oThis.dSignedUrl ),
          jForm
      ;
      if( !toSignedApi ){
        jForm       = jEl.parent('form');
        toSignedApi = jForm.data( oThis.dSignedUrl );
      }
      return toSignedApi;
    },

    getParams : function ( jEl ) {
      var fileType  = jEl[0].files[0].type ,
          inputName = jEl.attr('name'),
          params = { },

          currType , pathPreFix
      ;

      for(var key in oThis.fileTypeEnum ){
        if( fileType.indexOf( key ) > -1  ){
          currType = oThis.fileTypeEnum[ key ];
          params[ currType ] = {};
          params[ currType ][inputName] = fileType ;
          break;
        }
      }
      return params;
    },

    onSignedSuccess : function ( response , jEl ) {
      if( response.success ){
        oThis.uploadFile( response, jEl  )
      }else {
        oThis.showServerError( response , jEl ) ;
      }
    },

    uploadFile : function ( response, jEl ) {
      var inputName = jEl.attr('name');
      var action = response.data[inputName].url ,
          fields = response.data[inputName].fields,
          contentType = fields['Content-Type'],
          theFormFile  = jEl[0].files[0]
      ;

      jEl.fileupload('send', {
        files: [ theFormFile ],
        paramName: ['file'],
        url: action ,
        formData: fields,
        contentType: contentType
      });
    },

    onFileUploadSuccess : function ( data , jEl ) {
      var imgSrc   = data.src ,  //TODO
          jWrapper = jEl.closest( oThis.sParent ).find( oThis.sLabelWrap),
          jMarkup  = handlebarHelper.getMarkup( oThis.sUploadedImageWrap ,  {'img_src' : imgSrc } )
      ;
      jWrapper.html( jMarkup );
      jEl.val( imgSrc ) ;
    },

    updateImageDisplay : function ( jEl  ) {
      var curFiles = jEl[0].files[0],
          imgSrc   = window.URL.createObjectURL( curFiles ),
          jWrapper = jEl.closest( oThis.sParent ).find( oThis.sLabelWrap),
          jMarkup  = handlebarHelper.getMarkup( oThis.sUploadedImageWrap ,  {'img_src' : imgSrc } )
      ;
      jWrapper.html( jMarkup );
    },

    resetError : function ( jEl ) {
      jEl.closest( oThis.sParent ).find(".invalid-feedback")
        .html( "" )
        .removeClass( 'is-invalid' );
    },

    showServerError : function ( error , jEl ) {
      var err       = error['err'] ,
        errMessage  = err && err['display_text'] || oThis.generalErrorMsg
      ;
      oThis.showError( error , jEl ) ;
    },

    showError : function ( errMessage, jEl ) {
      var jWrapper = jEl.closest( oThis.sParent ).find( oThis.sLabelWrap),
          jMarkup  = jEl.data( oThis.dPreUploadMarkup )
      ;
      jEl.closest( oThis.sParent ).find(".invalid-feedback")
          .html( errMessage )
          .addClass( 'is-invalid' )
      ;
      jWrapper.html( jMarkup );
    },

    setToSignedApi : function ( selector ,  api ) {
      if(!selector || !api) return ;
      $(selector).data(oThis.dSignedUrl, api );
    }


};


})(window , jQuery);