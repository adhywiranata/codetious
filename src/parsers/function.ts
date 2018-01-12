const isReturnStatement = (code: any) => code.constructor.name === 'ReturnStatement';

// parse easy to read function object
const parseFunction = (func: any) => ({
  name: func.id.name,
  params: func.params.map((param: any) => param.name),
  isAsync: func.async,
  isFunctionExpression: func.expression,
  isGenerator: func.generator,
  hasReturnStatement: func.body.body.filter(isReturnStatement).length > 0,
});

module.exports = {
  parseFunction,
}