import { assert } from 'chai';

import MyPromise from '../../src/task3/myPromise';

/**
 * todo: figure out how to test promise chaining with mocha; how to test several then() invocation
 */
describe('Promise', () => {
  it('should immediately resolve promise', (done) => {
    const promise = new MyPromise((resolve) => {
      resolve(42);
    });

    promise.then((result) => {
      try {
        assert.equal(result, 42, 'result should be equal 42');
        assert.isTrue(promise.isFulfilled, 'promise should have fulfilled state');

        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should immediately reject promise', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject(new Error('Error happened'));
    });

    promise.then(() => {}, (reason) => {
      try {
        assert.instanceOf(reason, Error, 'reason should be instance of Error');
        assert.equal(reason.message, 'Error happened', 'should have save error message');
        assert.isTrue(promise.isRejected, 'promise should have rejected state');

        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
