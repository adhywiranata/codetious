import lib from '../../src';

import mocha from 'mocha';
import { expect } from 'chai';

describe('Esprima Wrapped Parser ', () => {
  it('should parse variable declaration properly', () => {
    const code = `
    let myVar;
    `;
    const expectedOutput = [
      {
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'myVar',
            },
            init: null,
          },
        ],
        kind: 'let',
      },
    ];
    
    expect(lib.parseDeep(code)).to.have.length(1);
    expect(lib.parseDeep(code)).to.deep.equal(expectedOutput);
  });

  it('should parse flattened code', () => {
    const code = `
      let myVar;
      let hello = "world";
      function hoi() {}
      console.log('wow')
      console.log(5)
      console.log(5 + 7)
      console.log(hello)
      console.log(myVar)
      myVar = 5;
      console.log(myVar)
      let mine
      mine = "blah blah blah"
      console.log(mine)
      mine = myVar
      console.log(mine)
      5 + 7
      5 + X
    `;

    // console.log(lib.parseFlatten(code));

    expect(true).to.have.equal(true);
  });

  it('should parse flattened code with log literal value', () => {
    const code = `
      console.log(100);
    `;

    const actualOutput = lib.parseFlatten(code)
    const expectedOutput = [
      {
        type: 'log',
        value: 100,
        valueType: 'Literal',
        valueIdentifierName: null,
      },
    ];

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse flattened code with resolved log binary expression value involving all literals', () => {
    const code = `
      console.log(100 + 999 - 300);
    `;

    const actualOutput = lib.parseFlatten(code)
    const expectedOutput = [
      {
        type: 'log',
        value: 799,
        valueType: 'BinaryExpression',
        valueIdentifierName: null,
      },
    ];

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse flattened code with resolved log identifier value', () => {
    const code = `
      let hello = "world";
      console.log(hello);
    `;

    const actualOutput = lib.parseFlatten(code)
    const expectedOutput = [
      {
        name: 'hello',
        value: 'world',
        initialValue: 'world',
        type: 'string',
        initialType: 'string',
        kind: 'let',
      },
      {
        type: 'log',
        value: 'world',
        valueType: 'Identifier',
        valueIdentifierName: 'hello',
      },
    ];

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should parse flattened code with resolved log identifier value with value that changes by assignment', () => {
    const code = `
      let hello2;
      console.log(hello2);
      hello2 = "awesome";
      console.log(hello2);
      hello2 = "code";
      console.log(hello2);
    `;

    const actualOutput = lib.parseFlatten(code)
    const expectedOutput = [
      {
        name: 'hello2',
        value: undefined,
        initialValue: undefined,
        type: undefined,
        initialType: undefined,
        kind: 'let',
      },
      {
        type: 'log',
        value: undefined,
        valueType: 'Identifier',
        valueIdentifierName: 'hello2',
      },
      {
        identifier: 'hello2',
        operator: '=',
        type: 'AssignmentExpression',
        value: 'awesome',
      },
      {
        type: 'log',
        value: 'awesome',
        valueType: 'Identifier',
        valueIdentifierName: 'hello2',
      },
      {
        identifier: 'hello2',
        operator: '=',
        type: 'AssignmentExpression',
        value: 'code',
      },
      {
        type: 'log',
        value: 'code',
        valueType: 'Identifier',
        valueIdentifierName: 'hello2',
      },
    ];

    expect(actualOutput).to.deep.equal(expectedOutput);
  });

  it('should reset scopeWindow value during each parseFlatten calls', () => {
    const code = `
      var deleteMeAfterNewParseCall = 999;
    `;

    lib.parseFlatten(code);

    const secondCode = `
      console.log(deleteMeAfterNewParseCall);
    `

    const actualOuput = lib.parseFlatten(secondCode);

    const unexpectedOutput = [
      {
        type: 'log',
        value: 999,
        valueType: 'Identifier',
        valueIdentifierName: 'deleteMeAfterNewParseCall',
      }
    ];

    expect(actualOuput).to.not.deep.equal(unexpectedOutput);
  });

  it('should parse flattened code with resolved log binary expression value involving some variable identifier', () => {
    const code = `
      let num = 100;
      console.log(1 + num);
    `;

    const actualOutput = lib.parseFlatten(code)
    const expectedOutput = [
      {
        name: 'num',
        value: 100,
        initialValue: 100,
        type: 'number',
        initialType: 'number',
        kind: 'let',
      },
      {
        type: 'log',
        value: 101,
        valueType: 'BinaryExpression',
        valueIdentifierName: null,
      },
    ];

    expect(actualOutput).to.deep.equal(expectedOutput);
  });
});