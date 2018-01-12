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
const parseBinary = (statement: any) => ({
  operator: statement.expression.operator,
  leftValue: statement.expression.left.value || null,
  rightValue: statement.expression.right.value || null,
});

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
