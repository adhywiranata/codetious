const isExpression = (code: any) => code.type === 'ExpressionStatement';
const isConsoleOp = (ex: any) => ex.expression.callee.object.name = 'console';
const isAssignment = (ex: any) => ex.expression.type === 'AssignmentExpression';
const isBinary = (ex: any) => ex.expression.type === 'BinaryExpression';

const validators: { [key: string]: any } = {
  isBinary,
  isExpression,
  isConsoleOp,
  isAssignment,
};

export default validators;