const codetious = require('./dist/bundle.js');

const sampleCode1 = `
let num = 5;
const phi = 3.14;
var x;
`;

// console.log(codetious.parseDeep(sampleCode1));
console.log(codetious.getVariableByName(sampleCode1, 'num'));
console.log(codetious.getVariableByName(sampleCode1, 'phi'));
console.log(codetious.getVariableByName(sampleCode1, 'pi'));
// console.log(codetious.getAllVariables(sampleCode1));

const sampleCode2 = `
let num = 5;

console.log(num);
num = 8;
num += 8;
5 + 7;
num = 1 + 3;
jon();
7;
`;

// console.log(codetious.parseDeep(sampleCode2));
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