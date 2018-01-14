import evaluators from '../evaluators';
import cursors from '../cursors';

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

// parse assignment expression
const parseAssignment = (statement: any) => {
  let value = undefined;
  const { expression } = statement;

  if (expression.right.type === 'Literal') {
    value = expression.right.value;
  }

  if (expression.right.type === 'BinaryExpression') {
    value = evaluators.evaluateBinary(parseBinary(expression.right));
  }

  return {
    type: expression.type,
    identifier: expression.left.name,
    operator: expression.operator,
    value,
  };
};

// parse statement into binary expression object
const parseBinary = (statement: any) => {
  if (statement.type === 'ExpressionStatement') {
    return {
      operator: statement.expression.operator,
      leftType: statement.expression.left.type, // should be between Literal or BinaryExpression
      rightType: statement.expression.right.type,
      leftValue: statement.expression.left.value || statement.expression.left,
      rightValue: statement.expression.right.value || statement.expression.right,
    };
  }

  if(statement.type === 'BinaryExpression') {
    return {
      operator: statement.operator,
      leftType: statement.left.type, // should be between Literal or BinaryExpression
      rightType: statement.right.type,
      leftValue: statement.left.value || statement.left,
      rightValue: statement.right.value || statement.right,
    };
  }
};

// parse console operations
const parseConsoleOp = (ex: any) => {
  const { expression } = ex;
  const type = expression.callee.property.name; // log, error, warn
  let value = null;
  let valueType = null; // null, Identifier, or Literal
  let valueIdentifierName = null;
  if(expression.arguments[0]) {
    value = expression.arguments[0].value;
    valueType = expression.arguments[0].type;
    if (valueType === 'Identifier') {
      valueIdentifierName = expression.arguments[0].name;
    }
    if(valueType === 'BinaryExpression') {
      value = evaluators.evaluateBinary(parseBinary(expression.arguments[0]));
    }
  }
  return {
    type,
    value,
    valueType,
    valueIdentifierName,
  }
};

const parsers: { [key: string]: any } = {
  parseAssignment,
  parseBinary,
  parseConsoleOp,
  parseExpression,
  parseExpressionArgument,
};

export default parsers;
