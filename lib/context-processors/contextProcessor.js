/**
 * @fileOverview Base Context Processor, meant to be extended with {@link extend}
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

/**
 * @module lib/context-processors/contextProcessor
 *
 */
module.exports = {
  /**
   * Number from 0 to 100, the higher the number, the sooner it will get executed.
   */
  priority: null,
  /**
   * The context processor name.
   */
  name: 'ContextProcessor',
  /**
   * An array of strings.
   */
  categories: [],
  /**
   * This Context Processor's configuration
   */
  config: {},
  /**
   * Hierarchical configuration cache
   */
  computedConfig: null,
  /**
   * Goes up the prototype chain looking for configurations and merging them into a single object.
   * @returns {Object} config
   */
  getConfig() {
    /**
     * Recursively go up the prototype chain looking for config properties and merging them into a single object
     * @param config the initial config object
     * @param obj a Context Processor object
     * @returns {Object} config
     */
    const getMergedConfig = (config, obj) => {
      if (!obj.__proto__) {
        return config;
      } else {
        const newConfig = Object.assign({}, obj.config, config);
        return getMergedConfig(newConfig, obj.__proto__);
      }
    };

    if (!this.computedConfig) {
      this.computedConfig = getMergedConfig(this.config, this);
    }
    return this.computedConfig;
  },
  /**
   * Checks if this Context Processor has to be executed based on the categories sent as arguments.
   * @param {Object} executionContext The execution context.
   * @returns {boolean} True if any category sent as argument matches any of the Context Processor's categories; false otherwise.
   */
  accepts({ categories }) {
    const executionContextCategories =
      (categories && Array.isArray(categories) ? categories : [categories]) ||
      [];
    const thisCategories =
      (this.categories && Array.isArray(this.categories)
        ? this.categories
        : [this.categories]) || [];
    return executionContextCategories.some(category =>
      thisCategories.find(cpCategory => category === cpCategory)
    );
  },
  /**
   * The 'core' of the Context Processor, modifies the <tt>contentModel</tt>.
   * @param {Object} executionContext and object containing the context in which the Context Processor is executed.
   * @param {Object} contentModel the Content Model to modify.
   * @returns {Promise.<T>} Optional return, only used if doing something async.
   */
  process(executionContext, contentModel) {
    return Promise.resolve();
  },
  /**
   * Extend a Context Processor, sending the properties to override as arguments.
   * @example contextProcessor.extend({categories: ['test'], priority: 70, name: 'Test ContextProcessor'})
   * @param {Object} extendedProperties the properties to override.
   * @returns {Object} an instance of the new Context Processor.
   */
  extend(extendedProperties) {
    const newObject = Object.create(this);
    return Object.assign(newObject, extendedProperties);
  }
};
