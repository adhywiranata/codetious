const esprima = require('esprima');

const selectors = require('./selectors');
const validators = require('./validators');

const exposedModule: any = {};

Object.keys(selectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    selectors[key](esprima.parseScript(code).body, ...params);
});

Object.keys(validators).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    validators[key](esprima.parseScript(code).body, ...params);
});

module.exports = exposedModule;