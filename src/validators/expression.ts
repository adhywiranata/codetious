const isExpression = (code: any) => code.constructor.name === 'ExpressionStatement';
const isConsoleOp = (ex: any) => ex.expression.callee.object.name = 'console';
const isAssignment = (ex: any) => ex.expression.type === 'AssignmentExpression';

const isValidBinary = (statement: any) => {
  if(statement.type === 'ExpressionStatement') {
    if(statement.expression.type === 'BinaryExpression') {
      return true;
    }
  }

  return false;
};

const validators: { [key: string]: any } = {
  isValidBinary,
  isExpression,
  isConsoleOp,
  isAssignment,
};

export default validators;