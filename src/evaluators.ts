const validator = require('./validators');

// Evaluate Binary Expressions

const evaluateBinary = (statement: any) => {
  console.log(statement);
  if(validator.isValidBinary(statement)) {
    console.log(validator.isValidBinary(statement))
  }

  console.log('not a valid binary!');
}

module.exports = {
  evaluateBinary,
};