import expressionParser from '../parsers/expression';
import validator from '../validators';

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does processes that don't hold value
*/

// expressions types filters
const filterExpressions = (code: any) => code.filter(validator.isExpression);

const filterConsoleOps = (code: any) => filterExpressions(code).filter(validator.isConsoleOp);

const filterAssignments = (code: any) => filterExpressions(code).filter(validator.isAssignment);

// get all expressions with any type
const getAllExpressions = (code: any) => filterExpressions(code).map(expressionParser.parseExpression);

// get all assignment only expressions
const getAllAssignments = (code: any) => filterAssignments(code).map(expressionParser.parseAssignment);

// get all console operations (log, error, warn)
const getAllConsoleOps = (code: any) => filterConsoleOps(code).map(expressionParser.parseConsoleOp);

const expressionSelector: { [key: string]: any } = {
  getAllExpressions,
  getAllAssignments,
  getAllConsoleOps,
};

export default expressionSelector;