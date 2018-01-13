import lib from '../src';
import functionParser from '../src/parsers/function';

import mocha from 'mocha';
import { expect } from 'chai';

const parseFirstLineFunction = (code) => {
  const parsedCode = lib.parseDeep(code);
  const parsedFirstLine = parsedCode[0];
  const parsedFunc = functionParser.parseFunction(parsedFirstLine);
  return parsedFunc;
};

describe('Function Parser', () => {
  it('should parse basic function declaration', () => {
    const code = `
    function myFunc() {
      console.log('this is a function');
    }
    `;
    const actualOutput = parseFirstLineFunction(code);
    const expectedOutput = {
      name: 'myFunc',
      params: [],
      isAsync: false,
      isFunctionExpression: false,
      isGenerator: false,
      hasReturnStatement: false,
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });
});