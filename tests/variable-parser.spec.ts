import lib from '../src';
import variableParser from '../src/parsers/variable';

import mocha from 'mocha';
import { expect } from 'chai';

const parseFirstLineVariable = (code) => {
  const parsedCode = lib.parseDeep(code);
  const parsedFirstLine = parsedCode[0];
  const parsedVar = variableParser.parseVariable(parsedFirstLine);
  return parsedVar;  
};

describe('Variable Parser', () => {
  it('should parse variable declaration', () => {
    const code = `let myVar;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myVar',
      value: undefined,
      type: undefined,
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with number value initialization', () => {
    const code = `let myVar = 100;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myVar',
      value: 100,
      type: 'number',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with string value initialization', () => {
    const code = `let myString = 'hello world';`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myString',
      value: 'hello world',
      type: 'string',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with boolean value initialization', () => {
    const code = `let myBool = true;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myBool',
      value: true,
      type: 'boolean',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with empty array value initialization', () => {
    const code = `let myArr = [1, 2, 3];`;
    const parsed = lib.parseDeep(code);
    console.log(parsed[0].declarations[0].init);
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: [],
      type: 'array',
      kind: 'let',
    };
    console.log(actualOutput);
    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse const variable declaration', () => {
    const code = `const myVar = 5;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myVar',
      value: 5,
      type: 'number',
      kind: 'const',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });
});