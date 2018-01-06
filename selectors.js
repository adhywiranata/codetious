const util = require('util');
const parseDeep = parsed => util.inspect(parsed, false, null);

// shallow selectors

// return all variable declarations
const isVariableDeclaration = p => p.constructor.name === 'VariableDeclaration';
const filterVariables = parsed => parsed.filter(isVariableDeclaration);

// return all expressions
const isExpression = p => p.constructor.name === 'ExpressionStatement';
const filterExpressions = parsed => parsed.filter(isExpression);

// return all assignment expressions
// const filterAssignments = parsed =>
//   parsed

// get all valid variables (var, let, const)

const parseVariable = variable => ({
  name: variable.declarations[0].id.name,
  value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
  kind: variable.kind,
});

const getAllVariables = parsed => {
  return filterVariables(parsed).map(parseVariable);
};

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does something..

*/
const parseExpression = ex => ({
  type: ex.expression.type,
});

const getAllExpressions = parsed => filterExpressions(parsed).map(parseExpression);

// shallowly checks if the code contains certain variable name
const getVariableByName = (parsed, name) => {
  for(vars of filterVariables(parsed)) {
    if(vars.declarations[0].id.name === name) {
      return true;
    }
  }
  return false;
};

module.exports = {
  parseDeep,
  filterVariables,
  getVariableByName,
  getAllVariables,
  filterExpressions,
  getAllExpressions,
};
