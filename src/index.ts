import lib from './lib';
import rootParsers from './parsers';
import rootSelectors from './selectors';
import rootEvaluators from './evaluators';
import rootCursors from './cursors';

// module containing all functions to be exposed
const exposedModule: any = {};

const { commonParser, ...restParsers } = rootParsers;

// esprima parse code then inject the parsed code to functions
const injectCommonParserModule = (childparserKey: string) => {
  exposedModule[childparserKey] = (code: string, ...params: any[]) => {
    const currentChildSelector = commonParser[childparserKey];
    const parsedCode = lib.esprimaParser(code);
    return currentChildSelector(parsedCode, ...params);
  };
};

const injectSelectorModule = (selectorKey: string) => {
  Object.keys(rootSelectors[selectorKey]).map((childSelectorKey: string) => {
    exposedModule[childSelectorKey] = (code: string, ...params: any[]) => {
      const currentChildSelector = rootSelectors[selectorKey];
      const parsedCode = lib.esprimaParser(code);
      return currentChildSelector[childSelectorKey](parsedCode, ...params);
    };
  });
};

// const injectParsersModule = (key: string) => exposedModule[key] = restParsers[key];
// const injectCursorsModule = (key: string) => exposedModule[key] = rootCursors[key];
// const injectEvaluatorsModule = (key: string) => exposedModule[key] = rootEvaluators[key];

// apply each functions to exposed module
Object.keys(commonParser).forEach(injectCommonParserModule);
Object.keys(rootSelectors).forEach(injectSelectorModule);
// Object.keys(restParsers).forEach(injectParsersModule);
// Object.keys(rootCursors).forEach(injectCursorsModule);
// Object.keys(rootEvaluators).forEach(injectEvaluatorsModule);

export default exposedModule;