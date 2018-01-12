import functionParser from '../parsers/function';

const isFunctionDeclaration = (code: any) => code.constructor.name === 'FunctionDeclaration';
const filterFunctions = (code: any) => code.filter(isFunctionDeclaration);

// get all valid functions declaration
const getAllFunctions = (code: any) => filterFunctions(code).map(functionParser.parseFunction);

// get a function 
const getFunctionByName = (code: any, name: string) => {
  for(let funcs of filterFunctions(code)) {
    if(functionParser.parseFunction(funcs).name === name) {
      return true;
    }
  }

  return false;
}

const functionSelector: { [key: string]: any } = {
  getAllFunctions,
  getFunctionByName,
};

export default functionSelector;