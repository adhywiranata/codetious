import expressionParser from '../parsers/expression';
import expressionValidator from '../validators/expression';

// get all expressions
/*
expression types:
- CallExpression: call a function
- AssignmentExpression: assign value to a variable
- BinaryExpression: does processes that don't hold value
*/

// expressions types filters
const filterExpressions = (code: any) => code.filter(expressionValidator.isExpression);

const filterConsoleOps = (code: any) => filterExpressions(code).filter(expressionValidator.isConsoleOp);

const filterAssignments = (code: any) => filterExpressions(code).filter(expressionValidator.isAssignment);

// get all expressions with any type
const getAllExpressions = (code: any) => filterExpressions(code).map(expressionParser.parseExpression);

// get all assignment only expressions
const getAllAssignments = (code: any) => filterAssignments(code).map(expressionParser.parseExpression);

// get all console operations (log, error, warn)
const getAllConsoleOps = (code: any) => filterConsoleOps(code).map(expressionParser.parseConsoleOp);

const expressionSelector: { [key: string]: any } = {
  filterExpressions,
  filterAssignments,
  filterConsoleOps,
  getAllExpressions,
  getAllAssignments,
  getAllConsoleOps,
};

export default expressionSelector;