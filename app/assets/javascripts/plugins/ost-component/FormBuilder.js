;
(function (window, $) {

  var oSTNs = ns("ost"),
    fileUploader = ns('ost.fileUploader'),
    richTextEditor = ns('ost.richTextEditor'),
    colorPicker = ns('ost.colorPicker'),
    handlebarHelper = ns('ost.handlebarHelper'),
    uiConfigConstants = ns('ost.uiConfigConstants'),
    configuratorConfig = ns('ost.configuratorConfig'),
    lengthMocker = ns('ost.lengthMocker'),

    sectionsAttr = uiConfigConstants.getSectionsAttr(),
    sCollapseWrapper = uiConfigConstants.getSectionContentWrapper(),

    withFormData = true,
    oThis
  ;

  oSTNs.formBuilder = oThis = {

    entityConfig: {},
    formData: {},

    entities: {},

    /*
    * Builds the left panel configurator
    * params : data
    * Eg : { entityConfig : {} formData : {} }
    */

    init: function ( data  ) {
      oThis.entityConfig  = data && data['entity_config'] || {};
      oThis.formData      = data && data['form_data'] || {};
      oThis.buildSections();
    },

    /*
     * Loops over all elements in dom with data attribute data-accordion-content
     * Get the data from UI config against the key present in data-accordion-content
     * from object configuratorConfig which is exposed in ost namespace. 
     */

    buildSections: function () {
      var jSections = $("[" + sectionsAttr + "]"),
        len = jSections.length, cnt,
        section
      ;
      if (!len) return;
      for (cnt = 0; cnt < len; cnt++) {
        section = jSections.eq(cnt);
        oThis.buildSection(section);
      }
    },

    /*
     * Builds a section depending on jWrapper and jWrapper has the section key in UIconfig.
     * params : jWrapper,
     * Eg : data-accordion-content="kycForm"
     * jWrapper Should have the above key.
     */

    buildSection: function ( jWrapper ) {
      var sectionKey    = jWrapper && jWrapper.attr(sectionsAttr),
          sectionConfig = oThis.getSectionConfig(sectionKey),
          section, jMarkup
      ;
      if (!sectionConfig) return;
      for ( var key in sectionConfig ) {
        section = sectionConfig[ key ];
        oThis.addClassNameInConfig( section, key );
        jMarkup = oThis.getSectionMarkup( section );
        if ( jMarkup ) {
          jWrapper.append( jMarkup );
        }
      }
    },

    /*
     * Builds DOM depending on the config passed.
     * params : sectionConfig,
     * returns : section Markup
     */

    getSectionMarkup: function ( sectionConfig ) {
      var entities = sectionConfig && sectionConfig.entities,
          sectionType, sTemplate, jSection, jMarkup
      ;
      sectionType = sectionConfig[ 'section_type' ];
      sTemplate   = oThis.getSectionTemplate( sectionType );
      jMarkup     = $(handlebarHelper.getMarkup( sTemplate, sectionConfig ) );
      if (entities) {
        jSection = $( jMarkup ).find( sCollapseWrapper  );
        oThis.buildEntities( jSection, entities );
      }
      return jMarkup[0];
    },


    /*
     * Build Entities of a section and appends to the jWrapper passed
     * params   : jWrapper, entities ,
     * returns  : undefined
     */

    buildEntities: function ( jWrapper, entities ) {
      var len = entities && entities.length, cnt,
          jMarkup, entityKey, entityConfig
      ;
      if ( !jWrapper ) return;
      for ( cnt = 0; cnt < len; cnt++ ) {
        entityKey = entities[cnt];
        entityConfig = oThis.getEntityConfig( entityKey, withFormData );
        oThis.buildEntity( entityConfig, jWrapper  );
      }
    },

    /*
     * Add entity to jWrapper and bind event
     * params   : entityConfig , jWrapper
     * withFormData should be not passed or passed as false if creating a new entity
     * returns  : jMarkup back if required to be used.
     */

    buildEntity: function ( entityConfig, jWrapper ) {
      var jMarkup ;
      if ( !entityConfig ) return ;
      jMarkup = oThis.getBuildEntityMarkup( entityConfig );
      if( jWrapper ) {
        jWrapper.append( jMarkup );
        oThis.bindEntityEvents( entityConfig );
      }
      return jMarkup;
    },

    /*
     * Get entity markup depending on entity key
     * params : entityConfig
     * withFormData => need to consist of backend data or not.
     * returns : Markup
     */

    getBuildEntityMarkup: function ( entityConfig ) {
      var value     = entityConfig['value'],
          customCom = entityConfig['is_custom'],
          jMarkup
      ;
      if ( customCom ) {
        jMarkup = oThis.getCustomComponentMarkup(entityConfig);
      } else if ( value instanceof Array ) {
        jMarkup = oThis.getArrayEntityMarkup(entityConfig)
      } else {
        jMarkup = oThis.getEntityMarkup(entityConfig);
      }
      return jMarkup;
    },

    /*
     * Get entity markup depending on entity key
     * params : entityKey, withFormData ,
     * withFormData => need to consist of backend data or not.
     * returns : Merged copy of entity config of UI , Backend and FormData
     */

    getEntityConfig: function ( entityKey, withFormData ) {
      var entityConfig  = oThis.getBEEntityConfig(entityKey),
          uiConfig      = oThis.getUIEntityConfig(entityKey),
          formData      = withFormData ? oThis.getFormData(entityKey) : null,
          mergedConfig  = {}
      ;
      mergedConfig = $.extend( true, mergedConfig, uiConfig, entityConfig );
      oThis.addClassNameInConfig( mergedConfig , entityKey );
      if (formData) {
        mergedConfig['value'] = formData;
      }
      return mergedConfig;
    },

    /*
     * Get entity markup for give config,
     * params : entityConfig
     * returns : Markup.
     */

    getEntityMarkup: function ( entityConfig ) {
      var entityType = entityConfig['inputType'],
          sTemplate, jMarkup
      ;
      sTemplate = oThis.getComponentTemplate( entityType );
      jMarkup   = handlebarHelper.getMarkup( sTemplate, entityConfig );
      return jMarkup;
    },


    /*
     * Get entity markup if value is of type array,
     * Builds entities for all value with same entity config with .
     * params : entityConfig
     * returns : Markup of all entities concatenated.
     */

    getArrayEntityMarkup: function ( entityConfig ) {
      var entityConfigCopy = $.extend( true, entityConfig ),
          values  = entityConfigCopy['value'],
          len     = values && values.length, cnt,
          jMarkup = "", currVal
      ;
      for (cnt = 0; cnt < len; cnt++) {
        currVal = values[cnt];
        entityConfigCopy['value'] = currVal;
        jMarkup = jMarkup.concat( oThis.getEntityMarkup( entityConfigCopy ) );
      }
      return jMarkup;
    },

    /*
     * Build entity for entity type custom,
     * params : entityConfig
     * returns : Markup.
     */

    getCustomComponentMarkup: function ( entityConfig ) {
      //if any custom component fill code here. OverWrite from outside.
    },

    /*
     * Adds class name to config object passed.
     * Its not a getter considering object by references.
     * params   : section , className,
     * returns  : undefined
     */

    addClassNameInConfig: function (section, className) {
      if( section && className ){
        section['className'] = className;
      }
    },

    /*
     * Binds event to the depending on type.
     * params   : entityConfig,
     * returns  : undefined
     */

    bindEntityEvents: function (entityConfig) {
      var inputType   = entityConfig['inputType'],
          entityName  = entityConfig['data_key_name'],
          inputTypes  = uiConfigConstants.getInputTypes(),
          selector , binderFunction
      ;
      if ( !entityName ) return ;
      selector = '[name="' + entityName + '"]';

      switch (inputType) {
        case inputTypes.file:
          binderFunction = fileUploader.bindButtonActions;
          break;
        case inputTypes.richTextEditor:
          binderFunction = richTextEditor.initTinyMc;
          break;
        case inputTypes.colorPicker:
            binderFunction = colorPicker.initColorPricker;
          break;
        case inputTypes.colorGradient:
          selector = oThis.getColorGradientSelector( entityConfig );
          binderFunction =  colorPicker.initColorPricker ;
          break;
      }

      setTimeout( function () {
        //If required passed config to binderFunction as well. Not required for now.
        binderFunction && binderFunction( selector  );
        lengthMocker.initLengthMocker();
        oThis.initToolTips();
      }, 0)
    },

    getColorGradientSelector : function ( entityConfig ) {
      var entityName  = entityConfig['data_key_name'] ,
          keyAppend   = entityConfig['name_append'] || '[color]' ,
          entityName  = entityName + keyAppend ,
          selector    =  '[name="' + entityName + '"]'
      ;
      return selector ;
    },

    /*
     * Depending on section type returns template by default collapse.
     * params : sectionType,
     * returns : template
     */

    getSectionTemplate: function ( sectionType ) {
      var getSectionTypesEnum = uiConfigConstants.getSectionTypesEnum(),
          sectionType         = sectionType || getSectionTypesEnum['collapse'],
          sectionTemplateMap  = uiConfigConstants.getSectionTemplateMap()
      ;
      return sectionTemplateMap[sectionType];
    },

    getComponentTemplate: function (type) {
      var inputTypes = uiConfigConstants.getTemplateMap();
      return inputTypes[type];
    },

    getSectionConfig: function (configKey) {
      return configuratorConfig[configKey];
    },

    getUIEntityConfig: function (entityKey) {
      return configuratorConfig['entityConfig'][entityKey];
    },

    getBEEntityConfig: function (entityKey) {
      return oThis.entityConfig[entityKey];
    },

    getFormData: function (entityKey) {
      return oThis.formData[entityKey];
    },

    initToolTips: function () {
      $('[data-toggle="tooltip"]').tooltip();
    }


  };


})(window, jQuery);