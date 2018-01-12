import cursors from './cursors';

// Evaluate Binary Expressions

const evaluateBinary = (statement: any) => {
  const res = cursors.getBinary(statement);
  if(res) {
    return eval('' + res.leftValue + res.operator + res.rightValue);
  }

  return 'not a valid binary!';
}

const evaluators: { [key: string]: any } = {
  evaluateBinary,
};

export default evaluators;