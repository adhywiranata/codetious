// parse easy to read variable object
const parseVariable = (variable: any) => ({
  name: variable.declarations[0].id.name,
  value: variable.declarations[0].init ? variable.declarations[0].init.value : undefined,
  type: variable.declarations[0].init ? typeof variable.declarations[0].init.value : undefined,
  kind: variable.kind, // var, let, or const
});

const parsers: { [key: string]: any } = {
  parseVariable,
};

export default parsers;