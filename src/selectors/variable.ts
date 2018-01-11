// parse easy to read variable object
const parseVariable = (variable: any) => ({
  name: variable.declarations[0].id.name,
  value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
  type: variable.declarations[0].init ? typeof variable.declarations[0].init.value : undefined,
  kind: variable.kind, // var, let, or const
});

// return all variable declarations
const isVariableDeclaration = (code: any) => code.constructor.name === 'VariableDeclaration';
const filterVariables = (code: any) => code.filter(isVariableDeclaration);

// get all valid variables (var, let, const)
const getAllVariables = (code: any) => {
  return filterVariables(code).map(parseVariable);
};

// shallowly checks if the code contains certain variable name
const getVariableByName = (code: any, name: string) => {
  for(let v of filterVariables(code)) {
    if(v.declarations[0].id.name === name) {
      return parseVariable(v);
    }
  }
  return false;
};

const variableSelector: { [key: string]: any } = {
  filterVariables,
  getVariableByName,
  getAllVariables,
};

module.exports = variableSelector;