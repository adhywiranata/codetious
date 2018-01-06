const util = require('util');
const parseDeep = code => util.inspect(code, false, null);

// shallow selectors

// VARIABLES

// return all variable declarations
const isVariableDeclaration = p => p.constructor.name === 'VariableDeclaration';
const filterVariables = code => code.filter(isVariableDeclaration);

// return all expressions
const isExpression = p => p.constructor.name === 'ExpressionStatement';
const filterExpressions = code => code.filter(isExpression);

// return all assignment expressions
const isAssignment = ex => ex.expression.type === 'AssignmentExpression';
const filterAssignments = code => filterExpressions(code).filter(isAssignment);

// parse easy to read variable object
const parseVariable = variable => ({
  name: variable.declarations[0].id.name,
  value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
  kind: variable.kind, // var, let, or const
});

// get all valid variables (var, let, const)
const getAllVariables = code => {
  return filterVariables(code).map(parseVariable);
};

// parse easy to read expression object
const parseExpression = ex => ({
  type: ex.expression.type,
});

// EXPRESSIONS

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does something..
*/
const getAllExpressions = code => filterExpressions(code).map(parseExpression);
const getAllAssignments = code => filterAssignments(code).map(parseExpression);

// shallowly checks if the code contains certain variable name
const getVariableByName = (code, name) => {
  for(vars of filterVariables(code)) {
    if(vars.declarations[0].id.name === name) {
      return true;
    }
  }
  return false;
};

module.exports = {
  parseDeep,
  // Variables
  filterVariables,
  getVariableByName,
  getAllVariables,
  // Expressions
  filterExpressions,
  filterAssignments,
  getAllExpressions,
  getAllAssignments,
};
