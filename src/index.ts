import lib from './lib';
import rootSelectors from './selectors';
import rootEvaluators from './evaluators';
import rootCursors from './cursors';

// module containing all functions to be exposed
const exposedModule: any = {};

// esprima parse code then inject the parsed code to functions
const injectSelectorModule = (selectorKey: string) => {
  Object.keys(rootSelectors[selectorKey]).map((childSelectorKey: string) => {
    exposedModule[childSelectorKey] = (code: string, ...params: any[]) => {
      const currentChildSelector = rootSelectors[selectorKey];
      const parsedCode = lib.esprimaParser(code);
      return currentChildSelector[childSelectorKey](parsedCode, ...params);
    };
  });
};

const injectCursorsModule = (key: string) => exposedModule[key] = rootCursors[key];
const injectEvaluatorsModule = (key: string) => exposedModule[key] = rootEvaluators[key];

// apply each functions to exposed module
Object.keys(rootSelectors).forEach(injectSelectorModule);
Object.keys(rootCursors).forEach(injectCursorsModule);
Object.keys(rootEvaluators).forEach(injectEvaluatorsModule);

module.exports = exposedModule;