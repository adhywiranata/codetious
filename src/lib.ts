const esprima = require('esprima');

const commonSelectors = require('./selectors/common');
const variableSelectors = require('./selectors/variable');
const expressionSelectors = require('./selectors/expression');
const functionSelectors = require('./selectors/function');

const rootValidators = require('./validators');
const rootEvaluators = require('./evaluators');

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

const esprimaParser = (code: string) => {
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
      return currentChildSelector[childSelectorKey](esprimaParser(code), ...params);
    }
  });
});

Object.keys(rootValidators).map((key) => {
  exposedModule[key] = rootValidators[key];
});

Object.keys(rootEvaluators).map((key) => {
  exposedModule[key] = rootEvaluators[key];
});

module.exports = exposedModule;