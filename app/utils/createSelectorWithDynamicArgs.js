import { createSelectorCreator } from 'reselect';
import { memoize } from 'lodash';

const hashFn = (...args) => args.reduce(
  (acc, val) => `${acc}-${JSON.stringify(val)}`,
  ''
);

const createSelectorWithDynamicArgs = createSelectorCreator(memoize, hashFn);
export default createSelectorWithDynamicArgs;
