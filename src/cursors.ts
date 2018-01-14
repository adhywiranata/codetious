import validator from './validators';
import expressionParser from './parsers/expression';

const getBinary = (statement: any) => {
  if(validator.isBinary(statement)) {
    return expressionParser.parseBinary(statement);
  }

  return false;
};

const cursors: { [key: string]: any } = {
  getBinary,
};

export default cursors;