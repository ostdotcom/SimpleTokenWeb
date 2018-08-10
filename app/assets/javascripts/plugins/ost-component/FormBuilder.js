;
(function ( window ,  $) {

  var oSTNs             = ns("ost"),
    fileUploader        = ns('ost.fileUploader'),
    richTextEditor      = ns('ost.richTextEditor'),
    colorPicker         = ns('ost.colorPicker'),
    handlebarHelper     = ns('ost.handlebarHelper'),
    configuratorConfig  = ns('ost.configuratorConfig'),
    sCollapse           = "#ost-collapse",
    sCollapseWrapper    = ".collapse-content-wrap",
    withFormData        =  true,
    oThis
  ;

  var accordionAttr = "data-accordion-content" ;

  oSTNs.formBuilder = oThis = {

    entityConfig  : {},
    formData      : {},

    entities      : {},

    init: function ( data  ) {
      oThis.entityConfig  = data[ 'entity_config' ] || {};
      oThis.formData      = data[ 'form_data' ]     || {};
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
        accordion = jAccordions.eq( cnt );
        oThis.buildCollapses( accordion );
      }
    },

    buildCollapses: function ( jWrapper ) {
      var accordionKey    = jWrapper && jWrapper.attr( accordionAttr ),
          accordionConfig = oThis.getSectionConfig( accordionKey ) ,
          collapsesConfig , collapse
      ;
      if( !accordionConfig ) return ;
      collapsesConfig  = accordionConfig['collapses'];
      for( var key in collapsesConfig ){
        collapse = collapsesConfig[ key ] ;
        oThis.buildCollapse( jWrapper , collapse ) ;
      }
    },

    buildCollapse : function ( jWrapper , collapseConfig ) {
      var entities = collapseConfig && collapseConfig.entities,
          jCollapse , jMarkup
      ;
      if( !entities ) return ;
      jMarkup   = $( handlebarHelper.getMarkup( sCollapse , collapseConfig ) ) ;
      jCollapse = $( jMarkup ).find( sCollapseWrapper );
      oThis.buildEntities( jCollapse , entities );
      jWrapper.append( jMarkup[0] );
    },

    buildEntities : function ( jWrapper , entities ) {
      var len = entities && entities.length , cnt ,
          entityKey
      ;
      for( cnt = 0; cnt < len ; cnt++ ){
        entityKey = entities[cnt];
        oThis.buildEntity( jWrapper , entityKey , withFormData ) ;
      }
    },

    buildEntity : function ( jWrapper , entityKey , withFormData ) {
      var entityConfig    = oThis.getEntityConfig( entityKey ) ,
          uiEntityConfig  = oThis.getUIEntityConfig( entityKey ) ,
          mergedConfig    = oThis.getMergedEntity( uiEntityConfig , entityConfig )
      ;
      if( withFormData ){
        mergedConfig = oThis.getEntityConfigWithFormData( mergedConfig  )
      }
      oThis.buildEntityMarkup( jWrapper , mergedConfig  );
    },

    buildEntityMarkup : function ( jWrapper , entityConfig ) {
      var dataKind = entityConfig['data_kind'] ,
          jMarkup
      ;
      if( dataKind == "array" ){
        jMarkup = oThis.getArrayEntityMarkup( entityConfig )
      }else{
        jMarkup = oThis.getEntityMarkup( entityConfig ) ;
      }
      jWrapper.append( jMarkup  );
    },

    getArrayEntityMarkup : function ( entityConfig  ) {
      var entityConfigCopy  = $.extend({}, entityConfig ),
          values            = entityConfigCopy['value'] ,
          len               = values && values.length , cnt,
          jMarkup           = "" , currVal
      ;
      if(!len) return ;
      for( cnt = 0 ;  cnt < len ; cnt++) {
        currVal = values[ cnt ] ;
        entityConfigCopy['value'] = currVal ;
        entityConfigCopy['count'] = cnt + 1;
        jMarkup = jMarkup.concat( oThis.getEntityMarkup( entityConfigCopy ) );
      }
      return jMarkup ;
    },

    getEntityMarkup : function ( entityConfig ) {
      var entityType = entityConfig['inputType'],
        sTemplate , jMarkup
      ;
      sTemplate = oThis.getComponentTemplate( entityType );
      jMarkup   = handlebarHelper.getMarkup( sTemplate , entityConfig );
      return jMarkup ;
    },

    getMergedEntity : function ( uiEntityConfig , entityConfig  ) {
      var mergedEntityConfig  = {} ;
      $.extend( mergedEntityConfig , uiEntityConfig , entityConfig  );
      return mergedEntityConfig ;
    },

    getEntityConfigWithFormData : function ( entityConfig ) {
      var  dataKeyName = entityConfig && entityConfig['data_key_name'],
           formData    = oThis.getFormData( dataKeyName )
      ;
      if( formData ){
        entityConfig['value'] = formData;
      }
      return entityConfig ;
    },

    getSectionConfig : function( configKey ){
      return configuratorConfig[ configKey ];
    },

    getUIEntityConfig : function ( entityKey ) {
      return configuratorConfig['entityConfig'][ entityKey ];
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

    intComponents: function(){
      fileUploader.bindButtonActions();
      richTextEditor.initTinyMc('.tinymce-editor');
      $('.color-picker-input').initColorPricker();
      oThis.initToolTips();
      oThis.initLengthMocker();
    },

    initLengthMocker : function () {
      $('.mock-length').on('keyup change', function () {
        var jParent     = $(this).closest('.form-group'),
            jMocker     = jParent.find('.length-mocker'),
            jVal        = $(this).val() || "",
            jTrimVal    = jVal.trim(),
            jValLength  = jTrimVal.length
        ;
        if( jMocker ){
          jMocker.html(jValLength);
        }
      });
    },

    initToolTips : function () {
      $('[data-toggle="tooltip"]').tooltip();
    }


  };


})(window , jQuery);