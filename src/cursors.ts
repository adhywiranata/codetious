import expressionValidator from './validators/expression';
import expressionParser from './parsers/expression';

const getBinary = (statement: any) => {
  if(expressionValidator.isValidBinary(statement)) {
    return expressionParser.parseBinary(statement);
  }

  return false;
};

const cursors: { [key: string]: any } = {
  getBinary,
};

export default cursors;