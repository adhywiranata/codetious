import lib from '../../src';
import expressionParser from '../../src/parsers/expression';

import mocha from 'mocha';
import { expect } from 'chai';

const parseFirstLineExpression = (code) => {
  const parsedCode = lib.parseDeep(code);
  const parsedFirstLine = parsedCode[0];
  const parsedFunc = expressionParser.parseExpression(parsedFirstLine);
  return parsedFunc;
};

describe('Expression Parser', () => {
  xit('should parse basic expression', () => {
  });

  xit('should parse binary expression', () => {
  });

  xit('should parse assignment expression', () => {
  });

  xit('should parse console.log calls', () => {
  });

  xit('should parse console.info calls', () => {
  });

  xit('should parse console.error calls', () => {
  });

  xit('should parse console.warn calls', () => {
  });
});