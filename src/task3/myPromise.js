import Is from '../utils/is';

const State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};

// default callbacks for onFulfilled and onRejected for then() method
const identity = (arg) => arg;
const thrower = (arg) => arg;

export default class MyPromise {
  /**
   * @private
   * @returns {boolean}
   */
  get isPending() {
    return this.state === State.PENDING;
  }

  constructor(executor) {
    this.state = State.PENDING;
    this.promiseResult = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    this.promiseJobs = [];

    // run executor
    setTimeout(() => {
      try {
        executor(this.resolve.bind(this), this.reject.bind(this));
      } catch (e) {
        this.reject(e);
      }
    }, 0);
  }

  /**
   * @public
   * @param {function} onFulfilledCb
   * @param {function} onRejectedCb
   * @returns {MyPromise}
   */
  then(onFulfilledCb = null, onRejectedCb = null) {
    const onFulfilled = Is.function(onFulfilledCb) ? onFulfilledCb : identity;
    const onRejected = Is.function(onRejectedCb) ? onRejectedCb : thrower;

    return new MyPromise((resolve, reject) => {
      const doFulfill = () => {
        const result = onFulfilled(this.promiseResult);

        if (result instanceof MyPromise) {
          result.then((res) => resolve(res));
        } else {
          resolve(result);
        }
      };

      if (this.state === State.PENDING) {
        this.onFulfilledCallbacks.push(() => { doFulfill(); });
        this.onRejectedCallbacks.push(() => { reject(onRejected(this.promiseResult)); });
      } else if (this.state === State.FULFILLED) {
        doFulfill();
      } else {
        reject(onRejected(this.promiseResult));
      }
    });
  }

  /**
   * @private
   * @param {Object} value
   */
  resolve(value) {
    if (!this.isPending) {
      return;
    }

    this.fulfill(State.FULFILLED, value, this.onFulfilledCallbacks);
    this.runPromiseJobs();
  }

  /**
   * @private
   * @param {Object} reason
   */
  reject(reason) {
    if (!this.isPending) {
      return;
    }

    this.fulfill(State.REJECTED, reason, this.onRejectedCallbacks);
    this.runPromiseJobs();
  }

  /**
   * @private
   * @param {int} state
   * @param {Object} promiseResult
   * @param {Array<function>} promiseJobs
   */
  fulfill(state, promiseResult, promiseJobs) {
    Object.assign(this, {
      state,
      promiseResult,
      promiseJobs,
    });
  }

  /**
   * @private
   */
  runPromiseJobs() {
    this.promiseJobs.forEach((callback) => { callback(this.promiseResult); });
  }
}
