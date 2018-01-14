import * as util from 'util';

import variableParser from './variable';
import functionParser from './function';
import expressionParser from './expression';

// parse deep: parse all code to esprima parsed object
const parseDeep = (code: any) => code;
const parseDeepToString = (code: any) => util.inspect(code, false, null);

// TODO parse flatten: parse all code to evaluated identifier and expressions
const resolveLine = (line: any) => {
  if (line.type === 'VariableDeclaration') {
    return variableParser.parseVariable(line);
  }

  if (line.type === 'FunctionDeclaration') {
    return functionParser.parseFunction(line);
  }

  if (line.type === 'ExpressionStatement') {
    return expressionParser.parseExpression(line);
  }

  return line;
};

const parseFlatten = (code: any) => {
  return code.map(resolveLine);
};

const parseFlattenToString = (code: any) => util.inspect(parseFlatten(code), false, null);

const commonParser: { [key: string]: any } = {
  parseDeep,
  parseDeepToString,
  parseFlatten,
  parseFlattenToString,
};

export default commonParser;