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
const parseConsoleOp = (ex: any) => ({
  type: ex.expression.callee.property.name,
  value: ex.expression.arguments[0] ? ex.expression.arguments[0].value : null,
  valueType: ex.expression.arguments[0] ? ex.expression.arguments[0].type : null,
  valueIdentifierName: ex.expression.arguments[0] ? (ex.expression.arguments[0].type === 'Identifier' ? ex.expression.arguments[0].name : null) : null,
});

const parsers: { [key: string]: any } = {
  parseExpressionArgument,
  parseExpression,
  parseConsoleOp,
  parseBinary,
};

export default parsers;
