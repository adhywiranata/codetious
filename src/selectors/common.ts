const util = require('util');
const parseDeep = (code: any) => util.inspect(code, false, null);

const commonSelector: { [key: string]: any } = {
  parseDeep,
};

module.exports = commonSelector;
