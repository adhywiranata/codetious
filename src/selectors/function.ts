// parse easy to read function object
const parseFunction = (func: any) => ({
  name: func.id.name,
  params: func.params.map((param: any) => param.name),
  isAsync: func.async,
  isFunctionExpression: func.expression,
  isGenerator: func.generator,
  hasReturnStatement: func.body.body.filter(isReturnStatement).length > 0,
});

const isFunctionDeclaration = (code: any) => code.constructor.name === 'FunctionDeclaration';
const filterFunctions = (code: any) => code.filter(isFunctionDeclaration);
const isReturnStatement = (code: any) => code.constructor.name === 'ReturnStatement';

// get all valid functions declaration
const getAllFunctions = (code: any) => filterFunctions(code).map(parseFunction);

// get a function 
const getFunctionByName = (code: any, name: string) => {
  for(let funcs of filterFunctions(code)) {
    if(parseFunction(funcs).name === name) {
      return true;
    }
  }

  return false;
}

const functionSelector: { [key: string]: any } = {
  getAllFunctions,
  getFunctionByName,
};

module.exports = functionSelector;