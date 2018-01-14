import * as util from 'util';

// parse deep: parse all code to esprima parsed object
const parseDeep = (code: any) => code;
const parseDeepToString = (code: any) => util.inspect(code, false, null);

// TODO parse flatten: parse all code to evaluated identifier and expressions
const parseFlatten = (code: any) => code;
const parseFlattenToString = (code: any) => util.inspect(parseFlatten(code), false, null);

const commonParser: { [key: string]: any } = {
  parseDeep,
  parseDeepToString,
  parseFlatten,
  parseFlattenToString,
};

export default commonParser;