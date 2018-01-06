const codetious = require('./lib');

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

console.log(num);
num = 8;
num += 8;
5 + 7;
num = 1 + 3;
jon();
7;
`;

// console.log(codetious.parseDeep(sampleCode2));
console.log(codetious.getAllAssignments(sampleCode2));