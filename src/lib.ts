import * as esprima from 'esprima';

import commonSelectors from './selectors/common';
import variableSelectors from './selectors/variable';
import expressionSelectors from './selectors/expression';
import functionSelectors from './selectors/function';

import rootEvaluators from './evaluators';
import rootCursors from './cursors';

const exposedModule: any = {};

const selectors: any = {
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

Object.keys(rootCursors).map((key: string) => {
  exposedModule[key] = rootCursors[key];
});

Object.keys(rootEvaluators).map((key: string) => {
  exposedModule[key] = rootEvaluators[key];
});

module.exports = exposedModule;