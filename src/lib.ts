const esprima = require('esprima');

const commonSelectors = require('./selectors/common');
const variableSelectors = require('./selectors/variable');
const expressionSelectors = require('./selectors/expression');
const functionSelectors = require('./selectors/function');

console.log(commonSelectors['parseDeep']);

const validators = require('./validators');

const exposedModule: any = {};

const parser = (code: string) => {
  try {
    const parsed = esprima.parseScript(code);
    return parsed.body;
  } catch (e) {
    return {
      error: String(e),
    };
  }
} 

Object.keys(commonSelectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
  commonSelectors[key](parser(code), ...params);
});

Object.keys(variableSelectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
  variableSelectors[key](parser(code), ...params);
});

Object.keys(expressionSelectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
  expressionSelectors[key](parser(code), ...params);
});

Object.keys(functionSelectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
  functionSelectors[key](parser(code), ...params);
});

Object.keys(validators).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    validators[key](parser(code), ...params);
});

module.exports = exposedModule;