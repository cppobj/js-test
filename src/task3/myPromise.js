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
  get isFulfilled() {
    return this.state === State.FULFILLED;
  }

  get isRejected() {
    return this.state === State.REJECTED;
  }

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

  then(onFulfilledCb, onRejectedCb) {
    const onFulfilled = Is.function(onFulfilledCb) ? onFulfilledCb : identity;
    const onRejected = Is.function(onRejectedCb) ? onRejectedCb : thrower;

    return new MyPromise((resolve, reject) => {
      if (this.state === State.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          resolve(onFulfilled(this.promiseResult));
        });
        this.onRejectedCallbacks.push(() => {
          reject(onRejected(this.promiseResult));
        });
      } else if (this.state === State.FULFILLED) {
        resolve(onFulfilled(this.promiseResult));
      } else { // rejected
        reject(onRejected(this.promiseResult));
      }
    });
  }

  resolve(value) {
    this.fulfill(State.FULFILLED, value, this.onFulfilledCallbacks);
    this.runPromiseJobs();
  }

  reject(reason) {
    this.fulfill(State.REJECTED, reason, this.onRejectedCallbacks);
    this.runPromiseJobs();
  }

  fulfill(state, promiseResult, promiseJobs) {
    Object.assign(this, {
      state,
      promiseResult,
      promiseJobs,
    });
  }

  runPromiseJobs() {
    this.promiseJobs.forEach((callback) => { callback(this.promiseResult); });
  }
}
