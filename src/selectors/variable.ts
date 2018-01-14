import variableParser from '../parsers/variable';

// return all variable declarations
const isVariableDeclaration = (code: any) => code.type === 'VariableDeclaration';
const filterVariables = (code: any) => code.filter(isVariableDeclaration);

// get all valid variables (var, let, const)
const getAllVariables = (code: any) => {
  return filterVariables(code).map(variableParser.parseVariable);
};

// shallowly checks if the code contains certain variable name
const getVariableByName = (code: any, name: string) => {
  for(let v of filterVariables(code)) {
    if(v.declarations[0].id.name === name) {
      return variableParser.parseVariable(v);
    }
  }
  return false;
};

const variableSelector: { [key: string]: any } = {
  getVariableByName,
  getAllVariables,
};

export default variableSelector;