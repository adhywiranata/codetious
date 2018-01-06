const util = require('util');
const parseDeep = (code: any) => util.inspect(code, false, null);

// shallow selectors

// VARIABLES
// parse easy to read variable object
const parseVariable = (variable: any) => ({
  name: variable.declarations[0].id.name,
  value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
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
  for(let vars of filterVariables(code)) {
    if(vars.declarations[0].id.name === name) {
      return true;
    }
  }
  return false;
};

// EXPRESSIONS

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does processes that don't hold value
*/

// parse easy to read expression object
const parseExpression = (ex: any) => ({
  type: ex.expression.type,
});

// expressions types filters
const isExpression = (code: any) => code.constructor.name === 'ExpressionStatement';
const filterExpressions = (code: any) => code.filter(isExpression);

const isAssignment = (ex: any) => ex.expression.type === 'AssignmentExpression';
const filterAssignments = (code: any) => filterExpressions(code).filter(isAssignment);

// get all expressions with any type
const getAllExpressions = (code: any) => filterExpressions(code).map(parseExpression);

// get all assignment only expressions
const getAllAssignments = (code: any) => filterAssignments(code).map(parseExpression);

// FUNCTIONS

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
  // Functions
  getAllFunctions,
  getFunctionByName,
};
