
(function (window ) {

  var oSTNs               = ns("ost"),
      oThis
  ;

  oSTNs.configuratorTopNav  = oThis = {

    init: function ( config ) {
      oThis.bindEvents();
    },

    bindEvents : function () {
      oThis.bindNavProducts();
      oThis.bindConfiguratorOptionsChange();
      oThis.bindCopyToClipboardChanges();
    },

    bindNavProducts : function () {
      var jNavProducts  =  $(".nav-products") ,
          sMegaDropDown = '.mega-dropdown-menu'
      ;
      jNavProducts.mouseenter( function () {
        $(this).find(sMegaDropDown).addClass('open');
      });
      jNavProducts.mouseleave( function () {
        $(this).find(sMegaDropDown).removeClass('open');
      });
    },

    bindConfiguratorOptionsChange : function () {
      var jSelect = $('#configurator-options'),
          jNext   = $('#next-item-btn'),
          jPre    = $('#previous-item-btn')
      ;

      jSelect.on('change' ,  function () {
        var value       = $(this).val();
        window.location.href = value;
      });

      jSelect.on('shown.bs.select', function () {
        var value = $(this).val();
        $(this).data('selected-value', value );
      });

      jNext.on('click' , function ( e ) {
        oThis.onOptionsUpdate( jSelect );
      });

      jPre.on('click' , function ( e ) {
        oThis.onOptionsUpdate( jSelect , true );
      });

    },

    onOptionsUpdate : function ( jSelect ,  isPre  ) {
      var jBootStrapSelect  = jSelect.parent('.bootstrap-select'),
          jCurrentSelected  = jBootStrapSelect.find(".dropdown-menu.inner .selected"),
          currentIndex      = jCurrentSelected.data("original-index") ,
          indexUpdater      = isPre ? -1 : 1,
          updatedIndex      = Number( currentIndex ) + indexUpdater ,
          jOption           = jSelect.find('option').eq( updatedIndex ),
          optionVal         = jOption.val()
      ;
      if( optionVal ){
        window.location.href = optionVal ;
      }
    },

    bindCopyToClipboardChanges : function () {
      $('#copy-shareable-link-btn').off('click').on('click' , function () {
        var jEl = $(this) ,
            currentText     = jEl.text() ,
            tempInput       = document.createElement('input'),
            contentToCopy   = window.location.href;

        document.body.appendChild( tempInput );
        tempInput.value = contentToCopy;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        jEl.text("Copied!");
        setTimeout( function () {
          jEl.text( currentText ) ;
        } , 5000 )
      });
    }


  };

  oThis.init(  );


})(window , jQuery );