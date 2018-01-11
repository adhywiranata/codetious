const util = require('util');
const parseDeep = (code: any) => util.inspect(code, false, null);

module.exports = {
  parseDeep
};
