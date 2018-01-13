const parseArrayElement = (elem: any) => {
  if(elem.type === 'Literal') {
    return elem.value;
  }

  if(elem.type === 'ArrayExpression') {
    const arrayElements = elem.elements;
    const parsedArray = arrayElements.map(parseArrayElement);
    return parsedArray;
  }

  // TODO handle object element
  return {};
};

// parse easy to read variable object
const parseVariable = (variable: any) => {
  const { declarations } = variable;
  let initialValue = undefined;
  let initialType = undefined;

  if (declarations[0].init) {
    if(declarations[0].init.type === 'Literal') {
      initialValue = declarations[0].init.value;
      initialType = typeof initialValue;
    }

    if(declarations[0].init.type === 'ArrayExpression') {
      const arrayElements = declarations[0].init.elements;
      const parsedArray = arrayElements.map(parseArrayElement);
      initialValue = parsedArray;
      initialType = 'array';
    }
  }

  return {
    name: declarations[0].id.name,
    value: initialValue,
    initialValue,
    type: initialType,
    initialType: initialType,
    kind: variable.kind, // var, let, or const
  };
};

const parsers: { [key: string]: any } = {
  parseVariable,
};

export default parsers;