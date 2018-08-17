;
(function (window  , $) {

  var oSTNs               = ns("ost"),
      formBuilder         = ns('ost.formBuilder'),
      configuratorHelper  = ns('ost.configuratorHelper'),
      richTextEditor      = ns('ost.richTextEditor') ,
      oThis
  ;

  oSTNs.kycConfigurator  = oThis = {

    init: function ( config ) {
      configuratorHelper.init( config , oThis.onSuccess );
    },

    onSuccess : function ( data ) {
      configuratorHelper.bindAccordionClick();
      oThis.bindDraggable( );
      oThis.bindAddComponent();
      oThis.bindDeleteComponents();
      oThis.bindPopUpToggleOption();
    },

    bindDraggable : function (  ) {
      var elId  ;
      $(".popup_kyc_configuration").sortable({
        items: ".tinymce-wrap",
        axis: 'y',
        cursor: 'move',
        start : function( event, ui  ) {
          var item = $(ui.item) ,
              jEl  = item && item.find('textarea')
          ;
          elId = jEl && jEl.attr( 'id' );
        },
        stop : function() {
          var jELID = "#"+elId ;
          tinyMCE.get(elId).destroy() ;
          richTextEditor.initTinyMc( jELID  );
        }
      });
    },

    bindPopUpToggleOption : function () {
      var entityKey   = 'kyc_form_popup_checkboxes' ,
          jVal ,  entityConfig , value ;
      $('[name="toggle_input"]').on('change' , function () {
        jVal = $(this).val() ;
        console.log("jVal---" , jVal );
        if( jVal == 0 ) {
          $('.' + entityKey).remove();
        }else {
          entityConfig = formBuilder.getEntityConfig( entityKey );
          value = entityConfig['value'];
          if( value instanceof Array && value.length == 0 ){
            entityConfig.value = null;
          }
          formBuilder.buildEntity( entityConfig , $('.popup_kyc_configuration'));
          oThis.bindDeleteComponents();
        }
      });
    },

    bindAddComponent : function () {
      var jWrapper = $('.popup_kyc_configuration') ,
          attrKey  = "data-component-to-add" ,
          entityKey , entityConfig
      ;
      $('.add-component-el').on('click' , function () {
        entityKey =$(this).attr( attrKey ) ;
        if( entityKey ){
          entityConfig = formBuilder.getEntityConfig( entityKey );
          formBuilder.buildEntity( entityConfig , jWrapper);
          oThis.bindDeleteComponents();
        }
      });
    },

    bindDeleteComponents : function () {
      $('.delete-component').off('click').on('click' ,function () {
        configuratorHelper.deleteComponent( $(this) );
      });
    }

  };

})(window , jQuery );