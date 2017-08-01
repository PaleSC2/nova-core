'use strict';

const contextProcessor = require('../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['test'],
  name: 'Text ContextProcessor',
  process (contentModel) {
    contentModel.test = 'Test Property 1!';
  }
});