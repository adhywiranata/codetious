const esprima = require('esprima');

const commonSelectors = require('./selectors/common');
const variableSelectors = require('./selectors/variable');
const expressionSelectors = require('./selectors/expression');
const functionSelectors = require('./selectors/function');

const validators = require('./validators');

const exposedModule: any = {};

interface RootSelector {
  commonSelectors: string;
  variableSelectors: string;
  expressionSelectors: string;
  functionSelectors: string;
  [key: string]: string;
}

const selectors: RootSelector = {
  commonSelectors,
  variableSelectors,
  expressionSelectors,
  functionSelectors,
};

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

Object.keys(selectors).map((selectorKey: string) => {
  Object.keys(selectors[selectorKey]).map((childSelectorKey: string) => {
    exposedModule[childSelectorKey] = (code: string, ...params: any[]) => {
      let currentChildSelector = selectors[selectorKey];
      return currentChildSelector[childSelectorKey](parser(code), ...params);
    }
  });
});

Object.keys(validators).map((key) => {
  exposedModule[key] = (code: string, ...params: any[]) =>
    validators[key](parser(code), ...params);
});

module.exports = exposedModule;