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

module.exports = {
  parseExpressionArgument,
  parseExpression,
  parseConsoleOp,
};
