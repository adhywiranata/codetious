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
});