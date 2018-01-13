import expressionParsers from './parsers/expression';
import cursors from './cursors';

// Evaluate Binary Expressions

const evaluateBinary = (statement: any): any => {
  const res = { ...statement };
  if(res) {
    let resLeft;
    let resRight;

    if (res.leftType === 'Literal') {
      resLeft = res.leftValue;
    }

    if (res.rightType === 'Literal') {
      resRight = res.rightValue;
    }

    if(res.leftType === 'BinaryExpression') {
      const parsedLeftBinary = expressionParsers.parseBinary(res.leftValue);
      resLeft = evaluateBinary(parsedLeftBinary);
    }

    if(res.rightType === 'BinaryExpression') {
      const parsedRightBinary = expressionParsers.parseBinary(res.rightValue);
      resRight = evaluateBinary(parsedRightBinary);
    }

    return eval('' + resLeft + res.operator + resRight);
  }

  return 'not a valid binary!';
}

const evaluators: { [key: string]: any } = {
  evaluateBinary,
};

export default evaluators;