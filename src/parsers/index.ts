import commonParser from './common';
import expressionParser from './expression';
import functionParser from './function';
import variableParser from './variable';

const parsers: { [key: string]: any } = {
  commonParser,
  expressionParser,
  functionParser,
  variableParser,
};

export default parsers;
