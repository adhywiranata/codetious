import * as util from 'util';

import variableParser from './variable';
import functionParser from './function';
import expressionParser from './expression';

import validators from '../validators';

// parse deep: parse all code to esprima parsed object
const parseDeep = (code: any) => code;
const parseDeepToString = (code: any) => util.inspect(code, false, null);

// TODO parse flatten: parse all code to evaluated identifier and expressions
type ScopedWindowType = {
  identifiers: any,
  functions: any
};

// scopeWindow is used to store any variables and function declarations when the next line of code need them
const scopedWindow: ScopedWindowType = {
  identifiers: [], // stored variables { name: string, value: any }
  functions: [], // stored functions
};

const resolveLine = (line: any) => {
  if (validators.isVariableDeclaration(line)) {
    const parsedVariable = variableParser.parseVariable(line);
    scopedWindow.identifiers.push({
      name: parsedVariable.name,
      value: parsedVariable.value,
    });

    return parsedVariable;
  }

  if (validators.isFunctionDeclaration(line)) {
    return functionParser.parseFunction(line);
  }

  if (validators.isBinary(line)) {
    return expressionParser.parseBinary(line);
  }

  if (validators.isAssignment(line)) {
    const parsedAssignment = expressionParser.parseAssignment(line);
    // lookup current window scope and update variable values
    const mappedIdentifierNames = scopedWindow.identifiers.map((i: { name: string, value: any }) => i.name);
    const identifierName = parsedAssignment.identifier;

    if(mappedIdentifierNames.includes(identifierName)) {
      const identifierIndex = mappedIdentifierNames.indexOf(identifierName);
      scopedWindow.identifiers[identifierIndex].value = parsedAssignment.value;
    }

    return parsedAssignment;
  }

  if (validators.isConsoleOp(line)) {
    const parsedConsoleOp = expressionParser.parseConsoleOp(line);
    const scopeEvaluatedConsoleOp = { ...parsedConsoleOp };

    // lookup current window scope for identifiers
    if(scopeEvaluatedConsoleOp.valueType === 'Identifier') {
      const mappedIdentifierNames = scopedWindow.identifiers.map((i: { name: string, value: any }) => i.name);
      const identifierName = scopeEvaluatedConsoleOp.valueIdentifierName;

      if(mappedIdentifierNames.includes(identifierName)) {
        const identifierIndex = mappedIdentifierNames.indexOf(identifierName);
        const identifier = scopedWindow.identifiers[identifierIndex]

        scopeEvaluatedConsoleOp.value = identifier.value
      }
    }

    return scopeEvaluatedConsoleOp;
  }

  if (validators.isExpression(line)) {
    return expressionParser.parseExpression(line);
  }

  return line;
};

const parseFlatten = (code: any) => code.map(resolveLine);

const parseFlattenToString = (code: any) => util.inspect(parseFlatten(code), false, null);

const commonParser: { [key: string]: any } = {
  parseDeep,
  parseDeepToString,
  parseFlatten,
  parseFlattenToString,
};

export default commonParser;