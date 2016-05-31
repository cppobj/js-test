import Is from '../utils/is';

class CoError extends Error {

}

const executor = function executorFn(generator, yieldValue) {
  const next = generator.next(yieldValue);
  const value = next.value;

  if (!(Is.promise(value) || Is.undefined(value))) {
    throw new CoError('Generator returned type different from Promise or undefined');
  }

  if (next.done) {
    return new Promise(resolve => {
      resolve(value);
    });
  }

  if (Is.promise(value)) {
    return value.then(
      result => executor(generator, result),
      error => generator.throw(error)
    );
  }

  return new Promise((resolve, reject) => {
    try {
      const result = executor(value);

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

const co = function coFn(generatorFn) {
  if (Is.generator(generatorFn)) {
    return new Promise(() => {
      throw new CoError('Generator function is not generator');
    });
  }

  return executor(generatorFn());
};

export {
  co as default,
  CoError,
};
