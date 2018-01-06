const esprima = require('esprima');

const selectors = require('./selectors');

const exposedModule: any = {};

Object.keys(selectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    selectors[key](esprima.parseScript(code).body, ...params);
});

module.exports = exposedModule;