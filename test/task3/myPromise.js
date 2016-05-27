import { assert } from 'chai';

import MyPromise from '../../src/task3/myPromise';

const CustomError = function CustomErrorConstructor(message) {
  this.message = message;
  // Error.apply(this, arguments); //doesn't work todo: figure out why
};

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

// todo: figure out why this doesn't work
// class CustomError extends Error {
//
// }

/**
 * todo: figure out how to test promise chaining with mocha; how to test several then() invocation
 */
describe('Promise', () => {
  it('should resolve promise', () => {
    const promise = new MyPromise((resolve) => {
      resolve(42);
    });

    promise.then((result) => {
      assert.equal(result, 42, 'result should be equal 42');
    });

    return promise;
  });

  it('should reject promise', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject(new Error('Error happened'));
    });

    promise.then(null, (reason) => {
      try {
        assert.instanceOf(reason, Error, 'reason should be instance of Error');
        assert.equal(reason.message, 'Error happened', 'should have save error message');

        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should reject promise when executor throws Error', (done) => {
    const promise = new MyPromise(() => {
      throw new CustomError('custom message');
    });

    promise.then(null, (error) => {
      try {
        assert.instanceOf(error, CustomError, 'error should be instance of CustomError');
        assert.equal(error.message, 'custom message', 'error should have message');

        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should have ability to chain promise', () => {
    const promise = new MyPromise((resolve) => {
      resolve(1);
    });

    return promise
      .then((result) => {
        assert.equal(result, 1, 'should be equal to 1');

        return result + 1;
      })
      .then((result) => {
        assert.equal(result, 2, 'result should be incremented to 1 ( == 2 )');

        return result + 1;
      })
      .then((result) => {
        assert.equal(result, 3, 'result should be incremented to 1 ( == 3 )');
      });
  });

  it('promise should be resolved once when user invokes multiple time resolve() method', () => {
    const promise = new MyPromise((resolve) => {
      resolve(11);
      resolve(72);
      resolve(71);
      resolve(70);
    });

    return promise.then((result) => {
      assert.equal(result, 11, 'result should be equal 42');
    });
  });

  it('promise should be rejected once when user invokes multiple time reject() method', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject('rejected');
      reject('error');
      reject('exception');
    });

    promise.then(null, (errorMessage) => {
      try {
        assert.equal(errorMessage, 'rejected', 'error should have message');

        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
