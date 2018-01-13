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
      initialValue: undefined,
      value: undefined,
      type: undefined,
      initialType: undefined,
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with number literal value initialization', () => {
    const code = `let myVar = 100;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myVar',
      value: 100,
      initialValue: 100,
      type: 'number',
      initialType: 'number',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with string literal value initialization', () => {
    const code = `let myString = 'hello world';`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myString',
      value: 'hello world',
      initialValue: 'hello world',
      type: 'string',
      initialType: 'string',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with boolean literal value initialization', () => {
    const code = `let myBool = true;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myBool',
      value: true,
      initialValue: true,
      type: 'boolean',
      initialType: 'boolean',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with empty array as initial value', () => {
    const code = `let myArr = [];`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: [],
      initialValue: [],
      type: 'array',
      initialType: 'array',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with array with literal elements as initial value', () => {
    const code = `let myArr = [1, 2, 3];`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: [1, 2, 3],
      initialValue: [1, 2, 3],
      type: 'array',
      initialType: 'array',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with nested array as initial value', () => {
    const code = `let myArr = [[1, 2], [3, 4] , [5, 6]];`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: [[1, 2], [3, 4] , [5, 6]],
      initialValue: [[1, 2], [3, 4] , [5, 6]],
      type: 'array',
      initialType: 'array',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with deep nested array as initial value', () => {
    const code = `let myArr = [[[[[1, [2]]], [5, 6]]], [5, [2, 1]]];`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: [[[[[1, [2]]], [5, 6]]], [5, [2, 1]]],
      initialValue: [[[[[1, [2]]], [5, 6]]], [5, [2, 1]]],
      type: 'array',
      initialType: 'array',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with empty object literal as initial value', () => {
    const code = `let myArr = {};`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: {},
      initialValue: {},
      type: 'object',
      initialType: 'object',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse variable declaration with object literal as initial value', () => {
    const code = `let myArr = { name: 'john', age: 23 };`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myArr',
      value: { name: 'john', age: 23 },
      initialValue: { name: 'john', age: 23 },
      type: 'object',
      initialType: 'object',
      kind: 'let',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse const variable declaration', () => {
    const code = `const myVar = 5;`;
    const actualOutput = parseFirstLineVariable(code);
    const expectedOutput = {
      name: 'myVar',
      value: 5,
      initialValue: 5,
      type: 'number',
      initialType: 'number',
      kind: 'const',
    };

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  // TODO
  // it('should warn on const variable declaration without value', () => {
  //   const code = `const myVar;`;
  //   const actualOutput = parseFirstLineVariable(code);
  //   const expectedOutput = {
  //     error: 'Const declaration not accompanied by initial value assignment!';
  //   };

  //   expect(actualOutput).to.deep.equal(expectedOutput);
  // });
});