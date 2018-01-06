// shallow selectors
const filterVariables = parsed =>
  parsed.filter(p => p.constructor.name === 'VariableDeclaration');

const getAllVariables = parsed => {
  return filterVariables(parsed).map(variable => ({
    name: variable.declarations[0].id.name,
    value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
    kind: variable.kind,
  }));
};

const getVariableByName = (parsed, name) => {
  for(vars of filterVariables(parsed)) {
    if(vars.declarations[0].id.name === name) {
      return true;
    }
  }
  return false;
};

module.exports = {
  filterVariables,
  getVariableByName,
  getAllVariables,
};
