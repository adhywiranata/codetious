const codetious = require('../src');

const sampleCode1 = `
let num = 5;
const phi = 3.14;
var x;
`;

// console.log(codetious.parseDeep(sampleCode1));
// console.log(codetious.getVariableByName(sampleCode1, 'num'));
// console.log(codetious.getVariableByName(sampleCode1, 'phi'));
// console.log(codetious.getVariableByName(sampleCode1, 'pi'));
// console.log(codetious.getAllVariables(sampleCode1));

const sampleCode2 = `
let num = 5;

// console.log(num);
num = 8;
// num += 8;
// 5 + 7;
// num = 1 + 3;
// jon();
// 7;
`;

// console.log(codetious.parseDeepToString(sampleCode2));
// console.log(codetious.getAllAssignments(sampleCode2));

const sampleCode3 = `
function hello(param1, param2) {
  var x = 5;
  var y = 6;
  return 'wow';
}

function hoy() {
  console.log('yeah');
}
`;

// console.log(codetious.parseDeep(sampleCode3));
// console.log(codetious.getAllFunctions(sampleCode3));
// console.log(codetious.getFunctionByName(sampleCode3, 'hello'));

const sampleCode4 = `
  if(true) {
    console.log('wow');
  }
`;

/*
{ type: 'IfStatement',
    test: { type: 'Literal', value: true, raw: 'true' },
    consequent:
     { type: 'BlockStatement',
       body:
        [ { type: 'ExpressionStatement',
            expression:
             { type: 'CallExpression',
               callee:
                { type: 'MemberExpression',
                  computed: false,
                  object: { type: 'Identifier', name: 'console' },
                  property: { type: 'Identifier', name: 'log' } },
               arguments: [ { type: 'Literal', value: 'wow', raw: '\'wow\'' } ] } } ] },
    alternate: null }
*/

// console.log(codetious.parseDeep(sampleCode4));

const sampleCode5 = `
  var num = 5;

  if(num > 3) {
    console.log('wow');
  }

  console.log('hi');
`;

// console.log(codetious.parseDeep(sampleCode5));

const sampleCode6 = `function() {}`;

// console.log(codetious.parseDeep(sampleCode6));

const sampleCode7 = `
  1 + 2
  1 + 2 + 3 + 4
  1 * 2 - 3 + 6
`

// console.log(codetious.parseDeep(sampleCode7));

// const parsedCode7 = codetious.parseDeep(sampleCode7);
// const parsedBinaries7 = parsedCode7.map(codetious.getBinary);
// console.log(parsedBinaries7);
// const evaluatedBinaries7 = parsedBinaries7.map(codetious.evaluateBinary);
// console.log(evaluatedBinaries7);

const sampleCode8 = `
  var x = 5;

  console.log(x);
  console.log('yeah');
  console.error('wogh');
  console.log(5 + 1);
  console.log(5 + 1 + 2 - 6 + 8);
  console.log();
`;

// console.log(codetious.parseDeep(sampleCode8));
// console.log(codetious.getAllConsoleOps(sampleCode8));

const sampleCode9 = `
  var num;
  num = 5 + 2;
`;

console.log(codetious.getAllAssignments(sampleCode9));