const esprima = require('esprima');
const util = require('util');

const selectors = require('./selectors');

const exposedModule = {};
Object.keys(selectors).map((key) => {
  exposedModule[key] = (code, ...params) =>
    selectors[key](esprima.parseScript(code).body, ...params);
});

module.exports = exposedModule;