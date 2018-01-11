const util = require('util');
const parseDeep = (code: any) => util.inspect(code, false, null);

// shallow selectors

// VARIABLES
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

// EXPRESSIONS

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does processes that don't hold value
*/

// parse expression arguments
const parseExpressionArgument = (arg : any) => ({
  type: arg.type,
  value: arg.value,
  // raw: arg.raw,
});

// parse easy to read expression object
const parseExpression = (ex: any) => ({
  type: ex.expression.type,
  callee: ex.expression.callee ? {} : null,
  arguments: ex.expression.arguments ? ex.expression.arguments.map(parseExpressionArgument) : null,
});

const parseConsoleOp = (ex: any) => ({
  type: ex.expression.callee.property.name,
  value: ex.expression.arguments[0] ? ex.expression.arguments[0].value : null,
  valueType: ex.expression.arguments[0] ? ex.expression.arguments[0].type : null,
  valueIdentifierName: ex.expression.arguments[0] ? (ex.expression.arguments[0].type === 'Identifier' ? ex.expression.arguments[0].name : null) : null,
});

// expressions types filters
const isExpression = (code: any) => code.constructor.name === 'ExpressionStatement';
const filterExpressions = (code: any) => code.filter(isExpression);

const isConsoleOp = (ex: any) => ex.expression.callee.object.name = 'console';
const filterConsoleOps = (code: any) => filterExpressions(code).filter(isConsoleOp);

const isAssignment = (ex: any) => ex.expression.type === 'AssignmentExpression';
const filterAssignments = (code: any) => filterExpressions(code).filter(isAssignment);

// get all expressions with any type
const getAllExpressions = (code: any) => filterExpressions(code).map(parseExpression);

// get all assignment only expressions
const getAllAssignments = (code: any) => filterAssignments(code).map(parseExpression);

// get all console operations (log, error, warn)
const getAllConsoleOps = (code: any) => filterConsoleOps(code).map(parseConsoleOp);


// get all console logs

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
  filterConsoleOps,
  getAllExpressions,
  getAllAssignments,
  getAllConsoleOps,
  // Functions
  getAllFunctions,
  getFunctionByName,
};
