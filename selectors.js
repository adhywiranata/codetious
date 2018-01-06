const util = require('util');
const parseDeep = parsed => util.inspect(parsed, false, null);

// shallow selectors
const filterVariables = parsed =>
  parsed.filter(p => p.constructor.name === 'VariableDeclaration');

const filterExpressions = parsed =>
  parsed.filter(p => p.constructor.name === 'ExpressionStatement');

// get all valid variables (var, let, const)
const getAllVariables = parsed => {
  return filterVariables(parsed).map(variable => ({
    name: variable.declarations[0].id.name,
    value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
    kind: variable.kind,
  }));
};

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does something..

*/
const getAllExpressions = parsed => {
  return filterExpressions(parsed)
    .map(expressionObj => expressionObj.expression)
    .map(expression => ({
      type: expression.type,
    }));
};

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
