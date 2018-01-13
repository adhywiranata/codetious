import * as util from 'util';

const parseDeep = (code: any) => code;
const parseDeepToString = (code: any) => util.inspect(code, false, null);

const commonParser: { [key: string]: any } = {
  parseDeep,
  parseDeepToString,
};

export default commonParser;