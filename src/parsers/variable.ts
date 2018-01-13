const parseArrayElement = (elem: any) => {
  if(elem.type === 'Literal') {
    return elem.value;
  }

  if(elem.type === 'ArrayExpression') {
    const arrayElements = elem.elements;
    const parsedArray = arrayElements.map(parseArrayElement);
    return parsedArray;
  }

  if(elem.type === 'ObjectExpression') {
    let parsedObject = {};
    const objectProperties = elem.properties;
    const parsedProperties: any = objectProperties.map(parseObjectProperty);
    parsedProperties.forEach((prop: any) => {
      parsedObject[prop.key] = prop.value;
    });
    return parsedObject;
  }
};

const parseObjectProperty = (property: any) => {
  let propValue;

  if (property.value.type === 'Literal') {
    propValue = property.value.value;
  }

  if (property.value.type === 'ArrayExpression') {
    const arrayElements = property.value.elements;
    const parsedArray = arrayElements.map(parseArrayElement);
    propValue = parsedArray;
  }

  if (property.value.type === 'ObjectExpression') {
    let parsedObject = {};
    const objectProperties = property.value.properties;
    const parsedProperties: any = objectProperties.map(parseObjectProperty);
    parsedProperties.forEach((prop: any) => {
      parsedObject[prop.key] = prop.value;
    });

    propValue = parsedObject;
  }

  return {
    key: property.key.name,
    value: propValue,
  };
};

// parse easy to read variable object
const parseVariable = (variable: any) => {
  const { declarations } = variable;
  let initialValue;
  let initialType;

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

    if(declarations[0].init.type === 'ObjectExpression') {
      let parsedObject = {};
      const objectProperties = variable.declarations[0].init.properties;
      const parsedProperties: any = objectProperties.map(parseObjectProperty);
      parsedProperties.forEach((prop: any) => {
        parsedObject[prop.key] = prop.value;
      });

      initialValue = parsedObject;
      initialType = 'object';
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