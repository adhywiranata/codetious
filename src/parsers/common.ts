import * as util from 'util';

import variableParser from './variable';
import functionParser from './function';
import expressionParser from './expression';

import validators from '../validators';

// parse deep: parse all code to esprima parsed object
const parseDeep = (code: any) => code;
const parseDeepToString = (code: any) => util.inspect(code, false, null);

// TODO parse flatten: parse all code to evaluated identifier and expressions
const resolveLine = (line: any) => {
  if (validators.isVariableDeclaration(line)) {
    return variableParser.parseVariable(line);
  }

  if (validators.isFunctionDeclaration(line)) {
    return functionParser.parseFunction(line);
  }

  if (validators.isBinary(line)) {
    return expressionParser.parseBinary(line);
  }

  if (validators.isAssignment(line)) {
    return expressionParser.parseAssignment(line);
  }

  if (validators.isConsoleOp(line)) {
    return expressionParser.parseConsoleOp(line);
  }

  if (validators.isExpression(line)) {
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