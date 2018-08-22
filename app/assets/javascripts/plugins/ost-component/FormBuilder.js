;
(function (window, $) {

  var oSTNs             = ns("ost"),
    fileUploader        = ns('ost.ostFileUploader'),
    richTextEditor      = ns('ost.richTextEditor'),
    colorPicker         = ns('ost.colorPicker'),
    handlebarHelper     = ns('ost.handlebarHelper'),
    uiConfigConstants   = ns('ost.uiConfigConstants'),
    configuratorConfig  = ns('ost.configuratorConfig'),
    lengthMocker        = ns('ost.lengthMocker'),

    sectionsAttr = uiConfigConstants.getSectionsAttr(),
    sCollapseWrapper = uiConfigConstants.getSectionContentWrapper(),

    withFormData = true,
    oThis
  ;

  oSTNs.formBuilder = oThis = {

    entityConfig: {},
    formData: {},

    /*
    * Builds the left panel configurator
    * params : data
    * Eg : { entityConfig : {} formData : {} }
    */

    init: function ( data  ) {
      oThis.initData( data );
      oThis.buildSections();
    },

    initData : function ( data ) {
      oThis.entityConfig  = data && data['entity_config'] || {};
      oThis.formData      = data && data['form_data'] || {};
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
          sectionConfig = oThis.getSectionsConfig(sectionKey),
          section, jMarkup
      ;
      if (!sectionConfig) return;
      for ( var key in sectionConfig ) {
        section = sectionConfig[ key ];
        section["sectionKey"] = key ;
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
          sectionType, sTemplate, jSection, jMarkup ,
          isValidSection = true
      ;
      sectionType = sectionConfig[ 'section_type' ];
      sTemplate   = oThis.getSectionTemplate( sectionType );
      jMarkup     = $(handlebarHelper.getMarkup( sTemplate, sectionConfig ) );
      if (entities) {
        jSection = $( jMarkup ).find( sCollapseWrapper  );
        isValidSection = oThis.buildEntities( jSection, entities );
      }
      if( !isValidSection ){
        $(oThis).trigger('invalid-section', sectionConfig );
      }else {
        return jMarkup[0];
      }
    },


    /*
     * Build Entities of a section and appends to the jWrapper passed
     * params   : jWrapper, entities ,
     * returns  : undefined
     */

    buildEntities: function ( jWrapper, entities ) {
      var len = entities && entities.length, cnt,
          jMarkup, entityKey, entityConfig ,
          hasValidEntity = false
      ;
      if ( !jWrapper ) return;
      for ( cnt = 0; cnt < len; cnt++ ) {
        entityKey       = entities[cnt];
        if( !hasValidEntity && oThis.isSectionValid( entityKey ) ){
          hasValidEntity  = true ;
        }
        entityConfig = oThis.getEntityConfig( entityKey, withFormData );
        if ( oThis.isEligibleEntity( entityConfig )
             && oThis.isBuildEntity( entityConfig ) ) {
          oThis.buildEntity( entityConfig, jWrapper  );
        };
      }
      return hasValidEntity ;
    },

    /*
     * While building a section, check for eligible only for backend config.
     * If none of the entities are valid dont create the section
     * params   : entityKey ,
     * returns  : boolean
     */

    isSectionValid : function ( entityKey ) {
      var entityConfig = oThis.getBEEntityConfig( entityKey  );
      return oThis.isEligibleEntity( entityConfig ) ;
    },

    /*
     * While building an individual entity, UI and BE merged config.
     * params   : entityConfig ,
     * returns  : boolean
     */
    isEligibleEntity : function ( entityConfig ) {
     return entityConfig && entityConfig['not_eligible'] != 1 ;
    },

    //Overwrite from outside
    isBuildEntity : function ( entityConfig ) {
      return true ;
    },

    /*
     * Add entity to jWrapper and bind event
     * params   : entityConfig , jWrapper
     * returns  : jMarkup back if required to be used.
     */

    buildEntity: function ( entityConfig, jWrapper ) {
      var jMarkup ;
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
      mergedConfig['entityKey'] = entityKey;
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
          binderFunction = fileUploader.init.bind( fileUploader );
          break;
        case inputTypes.richTextEditor:
          binderFunction = richTextEditor.initTinyMc.bind( richTextEditor );
          break;
        case inputTypes.colorPicker:
            binderFunction = colorPicker.initColorPricker.bind( colorPicker );
          break;
        case inputTypes.colorGradient:
          selector = oThis.getColorGradientSelector( entityConfig );
          binderFunction =  colorPicker.initColorPricker.bind( colorPicker ) ;
          break;
      }

      setTimeout( function () {
        //If required passed config to binderFunction as well. Not required for now.
        binderFunction && binderFunction( selector  );
        lengthMocker.initLengthMocker();
        oThis.initToolTips();
      }, 0)
    },

    /*
     * Get selector specific to color gradient entity.
     * For now name appended against color. Need to optimize code later.
     * params   : entityConfig,
     * returns  : selector by name.
     */

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

    /*
     * Function returns template id based on entity type passed.
     * params : type,
     * returns : template id
     */

    getComponentTemplate: function (type) {
      var inputTypes = uiConfigConstants.getTemplateMap();
      return inputTypes[type];
    },

    /*
     * Function returns Sections config based on key.
     * params : type, eg : "theme"
     * UI_config : "theme" : {
     *  "header_options" : {
     *     "header"      : "Header Options",
     *     "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
     *     "entities"    : [ "company_logo", "company_logo_size_percent", "company_favicon", "background_gradient" ]
     *  },
     *  ....... //More sections config
     * }
     * returns : {
     *  "header_options" : {
     *     "header"      : "Header Options",
     *     "tooltip"     : "Use a square image for best results. (Min 200KB, JPG/PNG only.)",
     *     "entities"    : [ "company_logo", "company_logo_size_percent", "company_favicon", "background_gradient" ]
     *  },
     *  ...... //More sections config
     * }
     */

    getSectionsConfig: function (configKey) {
      return configuratorConfig[configKey];
    },

    setSectionsConfig: function ( configKey , config ) {
      if( configKey && config ){
        configuratorConfig[configKey] = config ;
      }
    },

    /*
     * Function returns Frontend UI config based on key passed.
     * params : type, eg : "company_logo"
     * entity_config : {
     *    company_logo : {
     *      'label'          : "Masthead Logo",
     *      'tooltip'        : "Use a square image for best results. (Min 200KB, Max 1GB, JPG/PNG only.)",
     *      'title'          : "File Upload",
     *      "inputType"      : inputTypesEnum.file,
     *    },  ....... //More entity config
     *  }
     * returns : {
     *      'label'          : "Masthead Logo",
     *      'tooltip'        : "Use a square image for best results. (Min 200KB, Max 1GB, JPG/PNG only.)",
     *      'title'          : "File Upload",
     *      "inputType"      : inputTypesEnum.file
     * }
     */

    getUIEntityConfig: function (entityKey) {
      return configuratorConfig['entityConfig'][entityKey];
    },

    setUIEntityConfig: function ( entityKey ,  entityConfig ) {
      if( entityKey && entityConfig ){
         configuratorConfig['entityConfig'][entityKey] = entityConfig ;
      }
    },

    /*
     * Function returns Backend entity config based on key passed.
     * params : type, eg : "company_logo"
     * entity_config  : {
     *    company_logo : {
     *      'data_kind'      : "file",
     *       'data_key_name'  : "company_logo",
     *       'validation'     : {
     *             'min_bytes'      : '100',
     *             'max_bytes'      : '999999999999',
     *             'required'       : 1,
     *             'accept'         : ['image/jpg' , 'image/png']
     *       }
     *    },  .......  //More entity config
     *  }
     * returns : {
     *       'data_kind'      : "file",
     *       'data_key_name'  : "company_logo",
     *       'validation'     : {
     *             'min_bytes'      : '100',
     *             'max_bytes'      : '999999999999',
     *             'required'       : 1,
     *             'accept'         : ['image/jpg' , 'image/png']
     *       }
     * }
     */

    getBEEntityConfig: function (entityKey) {
      return oThis.entityConfig[entityKey];
    },

    setBEEntityConfig: function ( entityKey , entityConfig ) {
      if( entityKey && entityConfig ){
        oThis.entityConfig[entityKey] = entityConfig ;
      }
    },

    /*
     * Function returns Backend Value for the entity based on key passed.
     * params : type, eg : "company_logo"
     * form_data  : {
     *    company_logo : "some value here",
     *    .......
     *  }
     * returns : "some value here"
     */

    getFormData: function (entityKey) {
      return oThis.formData[entityKey];
    },

    setFormData: function ( entityKey , formData ) {
      if( entityKey && formData ){
        oThis.formData[entityKey] = formData ;
      }
    },

    /*
     * Function to overwrite complete form data and entity config individually.
     */

    setCompleteFormData : function ( formData ) {
      if( formData ){
        oThis.formData = formData ;
      }
    },

    setCompleteEntityConfig : function ( entityConfig ) {
      if( entityConfig ){
        oThis.entityConfig = entityConfig ;
      }
    },

    /*
     * Init all tooltips .
     */
    initToolTips: function () {
      $('[data-toggle="tooltip"]').tooltip();
    }


  };


})(window, jQuery);