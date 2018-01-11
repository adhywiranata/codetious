// parse statement into binary expression object
const parseBinary = (statement: any) => ({
  operator: statement.expression.operator,
  leftValue: statement.expression.left.value || null,
  rightValue: statement.expression.right.value || null,
});

const isValidBinary = (statement: any) => {
  if(statement.type === 'ExpressionStatement') {
    if(statement.expression.type === 'BinaryExpression') {
      return true;
    }
  }

  return false;
}

const getBinary = (statement: any) => {
  if(isValidBinary(statement)) {
    return parseBinary(statement);
  }

  return { error: 'Not a binary Statement' };
}

module.exports = {
  isValidBinary,
  getBinary,
};