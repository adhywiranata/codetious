const validator = require('./validators');

// Evaluate Binary Expressions

const evaluateBinary = (statement: any) => {
  const res = validator.getBinary(statement);
  if(res) {
    return eval('' + res.leftValue + res.operator + res.rightValue);
  }

  return 'not a valid binary!';
}

module.exports = {
  evaluateBinary,
};