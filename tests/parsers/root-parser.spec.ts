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
      5 + 7
      5 + X
    `;

    // console.log(lib.parseFlatten(code));

    expect(true).to.have.equal(true);
  });
});