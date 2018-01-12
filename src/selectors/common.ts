import * as util from 'util';

const parseDeep = (code: any) => code;
const parseDeepToString = (code: any) => util.inspect(code, false, null);

const commonSelector: { [key: string]: any } = {
  parseDeep,
  parseDeepToString,
};

export default commonSelector;