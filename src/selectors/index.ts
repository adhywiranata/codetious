import commonSelectors from './common';
import variableSelectors from './variable';
import expressionSelectors from './expression';
import functionSelectors from './function';

const selectors: { [key: string]: any } = {
  commonSelectors,
  variableSelectors,
  expressionSelectors,
  functionSelectors,
};

export default selectors;