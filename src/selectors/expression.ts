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

// parse console operations
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

module.exports = {
  filterExpressions,
  filterAssignments,
  filterConsoleOps,
  getAllExpressions,
  getAllAssignments,
  getAllConsoleOps,
};