const esprima = require('esprima');

const selectors = require('./selectors');
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

Object.keys(selectors).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    selectors[key](parser(code), ...params);
});

Object.keys(validators).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    validators[key](parser(code), ...params);
});

module.exports = exposedModule;