// expressions
const isExpression = (exp: any) => exp.type === 'ExpressionStatement';
const isConsoleOp = (exp: any) => exp.expression.callee.object.name = 'console';
const isAssignment = (exp: any) => exp.expression.type === 'AssignmentExpression';
const isBinary = (exp: any) => exp.expression.type === 'BinaryExpression';

const isVariableDeclaration = (exp: any) => exp.type === 'VariableDeclaration';
const isFunctionDeclaration = (exp: any) => exp.type === 'FunctionDeclaration';

const validators: { [key: string]: any } = {
  isBinary,
  isExpression,
  isConsoleOp,
  isAssignment,
  isVariableDeclaration,
  isFunctionDeclaration,
};

export default validators;