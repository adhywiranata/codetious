// shallow selectors
const filterVariables = parsed =>
  parsed.filter(p => p.constructor.name === 'VariableDeclaration');

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
}