;
(function ( window ,  $) {

  var oSTNs             = ns("ost"),
    fileUploader        = ns('ost.fileUploader'),
    richTextEditor      = ns('ost.richTextEditor'),
    colorPicker         = ns('ost.colorPicker'),
    handlebarHelper     = ns('ost.handlebarHelper'),
    configuratorConfig  = ns('ost.configuratorConfig'),
    oThis
  ;

  var accordionAttr = "data-accordion-content" ;

  oSTNs.formBuilder = oThis = {

    entityConfig  : {},
    formData      : {},

    entities      : {},

    init: function ( data  ) {
      oThis.entityConfig  = data[ 'entity_config' ] || {};
      oThis.formData      = data[ 'form_data' ] || {};
      oThis.buildAccordions();
      oThis.intComponents();
    },

    buildAccordions : function () {
      var jAccordions = $("[" + accordionAttr + "]") ,
        len = jAccordions.length ,  cnt,
        accordion
      ;

      if( !len ) return ;
      for( cnt = 0 ;  cnt < len ; cnt++ ){
        accordion   = jAccordions.eq( cnt );
        oThis.buildCollapses( accordion  );
      }
    },

    buildCollapses: function ( accordion ) {
      var configKey = accordion && accordion.data('accordion-content'),
        config    = oThis.getUIConfig( configKey ) ,
        collapsesConfig , collapse

      ;
      if( !config ) return ;
      collapsesConfig  = config['collapses'];
      for( var key in  collapsesConfig ){
        collapse = collapsesConfig[ key ] ;
        oThis.buildCollapse( accordion , collapse ) ;
      }
    },

    buildCollapse : function ( accordion , collapse ) {
      var jMarkup = handlebarHelper.getMarkup( "#ost-collapse" , collapse ) ,
        entities  = collapse.entities,
        jCollapse
      ;

      accordion.append( jMarkup );
      jCollapse = accordion.find('.collapse-content-wrap');
      oThis.buildEntities( jCollapse , entities );

    },

    buildEntities : function ( jCollapse , entities ) {
      if( !entities ) return ;
      oThis.setEntities( entities );
      for( var key in  entities ){
        oThis.buildEntity( jCollapse , key  ) ;
      }
    },

    buildEntity : function ( jCollapse , entityKey ) {
      var entityConfig    = oThis.getEntityConfig( entityKey ) ,
        uiEntityConfig  = oThis.getUIEntityConfig( entityKey ) ,
        dataKeyName     = entityConfig && entityConfig['data_key_name'],
        formData        = oThis.getFormData( dataKeyName ),
        jMarkup
      ;

      entityConfig = oThis.getMergedEntity( uiEntityConfig , entityConfig , formData );
      jMarkup = oThis.getEntityMarkup( entityConfig ) ;
      jCollapse.append( jMarkup  );
    },

    getEntityMarkup : function ( entityConfig ) {
      var entityType = entityConfig['inputType'],
        sTemplate , jMarkup
      ;
      sTemplate = oThis.getComponentTemplate( entityType );
      jMarkup   = handlebarHelper.getMarkup( sTemplate , entityConfig );
      return jMarkup ;
    },

    getMergedEntity : function ( uiEntityConfig , entityConfig , formData ) {
      var mergedEntityConfig  = {} ;
      $.extend( mergedEntityConfig , uiEntityConfig , entityConfig  );
      if( formData ){
        mergedEntityConfig['value'] = formData ;
      }
      return mergedEntityConfig ;
    },

    getUIConfig : function( configKey ){
      return configuratorConfig[ configKey ];
    },

    getUIEntityConfig : function ( entityKey ) {
      return oThis.entities[ entityKey ];
    },

    getEntityConfig: function ( entityKey ) {
      return oThis.entityConfig[ entityKey ];
    },

    getFormData : function( entityKey ){
      return oThis.formData[ entityKey ];
    },

    getComponentTemplate : function ( type  ) {
      var inputTypes = configuratorConfig.getTemplateMap();
      return inputTypes[ type ];
    },
    setEntities : function ( entities  ) {
      oThis.entities  = entities;
    },

    intComponents: function(){
      fileUploader.bindButtonActions();
      richTextEditor.initTinyMc('.tinymce-editor');
      colorPicker.initColorPicker('.color-picker-input');
      $('[data-toggle="tooltip"]').tooltip();
    }


  };


})(window , jQuery);