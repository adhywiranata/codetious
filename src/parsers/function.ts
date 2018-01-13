const isReturnStatement = (code: any) => code.type === 'ReturnStatement';

// parse easy to read function object
const parseFunction = (func: any) => ({
  name: func.id.name,
  params: func.params.map((param: any) => param.name),
  isAsync: func.async,
  isFunctionExpression: func.expression,
  isGenerator: func.generator,
  hasReturnStatement: func.body.body.filter(isReturnStatement).length > 0,
});

const parsers: { [key: string]: any } = {
  parseFunction,
};

export default parsers;