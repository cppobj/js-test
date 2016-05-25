const State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};

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

  then(onFulfilled, onRejected) {
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
    this.state = State.FULFILLED;
    this.promiseResult = value;

    this.onFulfilledCallbacks.forEach((cb) => { cb(this.promiseResult); });
  }

  reject(reason) {
    this.state = State.REJECTED;
    this.promiseResult = reason;

    this.onRejectedCallbacks.forEach((cb) => { cb(this.promiseResult); });
  }
}
