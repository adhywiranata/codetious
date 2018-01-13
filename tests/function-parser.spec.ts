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

  it('should parse basic function declaration with return statement', () => {
    const code = `
    function myFunc() {
      console.log('this is a function');
      return 'anything';
    }
    `;
    const actualOutput = parseFirstLineFunction(code);
    const expectedOutput = {
      name: 'myFunc',
      params: [],
      isAsync: false,
      isFunctionExpression: false,
      isGenerator: false,
      hasReturnStatement: true,
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse function with parameters declaration', () => {
    const code = `
    function myFunc(name) {
      console.log('this is a function');
    }
    `;
    const actualOutput = parseFirstLineFunction(code);
    const expectedOutput = {
      name: 'myFunc',
      params: ['name'],
      isAsync: false,
      isFunctionExpression: false,
      isGenerator: false,
      hasReturnStatement: false,
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  xit('should parse and identify function expression', () => {
    // TODO tests for function expression
  });

  xit('should parse and identify async function', () => {
    // TODO tests for async functions 
  });

  xit('should parse and identify generator function', () => {
    // TODO tests for generator functions
  });
});