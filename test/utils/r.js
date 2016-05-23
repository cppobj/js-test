import { assert } from 'chai';

import R from '../../src/utils/r';

describe('R', () => {
  describe('#bind', () => {
    it('should make partial function with fixed set of args', () => {
      function g(a, b, c) {
        return [this, a, b, c];
      }

      assert.deepEqual(g(1, 2, 3), [undefined, 1, 2, 3],
        'g function should return their context and arguments');

      const p1 = R.bind(g, 1, 2, 3, R._);

      assert.deepEqual(p1(), [1, 2, 3, undefined], 'bound case 1.1');
      assert.deepEqual(p1(4), [1, 2, 3, 4], 'bound case 1.2');

      const p2 = R.bind(g, 1, R._, 2, 3);

      assert.deepEqual(p2(), [1, undefined, 2, 3], 'bound case 2.1');
      assert.deepEqual(p2(4), [1, 4, 2, 3], 'bound case 2.2');

      const p3 = R.bind(g, 1, R._, R._);

      assert.deepEqual(p3(), [1, undefined, undefined, undefined], 'bound case 3.1');
      assert.deepEqual(p3(4), [1, 4, undefined, undefined], 'bound case 3.2');
      assert.deepEqual(p3(4, 5), [1, 4, 5, undefined], 'bound case 3.3');
      assert.deepEqual(p3(4, 5, 6), [1, 4, 5, 6], 'bound case 3.4');
    });
  });
});
