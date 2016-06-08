import 'babel-polyfill';

import { assert } from 'chai';

import co from '../../src/task3/co';

describe('co', () => {
  it('official example 0 (resolving)', () =>
    co(function* generator() {
      const result = yield Promise.resolve(true);
      return result;
    }).then((value) => {
      assert.isTrue(value, 'the value should be true');
    })
  );

  it('official example 1 (rejection)', () =>
    co(function* generator() {
      yield Promise.reject(new Error('error message'));
    }).catch((error) => {
      assert.instanceOf(error, Error, 'error should be instance of Error');
      assert.equal(error.message, 'error message', 'error should have same error message');
    })
  );

  it('example 0', () =>
    co(function* generator() {
      const a = yield Promise.resolve(1);
      const b = yield Promise.resolve(2);
      const c = yield Promise.resolve(3);

      return [a, b, c];
    }).then((result) => {
      assert.deepEqual(result, [1, 2, 3], 'should have same result');
    })
  );

  it('example 1', () =>
    co(function* generator() {
      const a1 = yield new Promise((resolve) => {
        resolve('foo');
      });
      const a3 = 12;
      const a2 = yield Promise.resolve('bar');

      return `${a1} ${a2} ${a3}`;
    }).then((result) => {
      assert.equal(result, 'foo bar 12', 'should have same result');
    })
  );
});
