const codetious = require('./lib');

const sampleCode1 = `
let num = 5;
const phi = 3.14;
`;

console.log(codetious.getVariableByName(sampleCode1, 'num'));
console.log(codetious.getVariableByName(sampleCode1, 'phi'));
console.log(codetious.getVariableByName(sampleCode1, 'pi'));