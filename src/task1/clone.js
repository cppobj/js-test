import Is from './../utils/is';

class CloneError extends Error {

}

class Clone {
  static clone(value) {
    const type = typeof value;

    switch (type) {
      case 'undefined':
      case 'number':
      case 'string':
      case 'boolean':
        return Clone.primitive(value);
      case 'function':
        return Clone.function(value);
      case 'object':
        return Clone.object(value);
      default:
        throw new CloneError(`Clone type of '${type}' not implemented.`);
    }
  }

  static primitive(value) {
    return value;
  }

  static object(source) {
    if (Is.null(source)) {
      return null;
    }

    if (Is.date(source)) {
      return new Date(source.getTime());
    }

    if (Is.regExp(source)) {
      return new RegExp(source.source, source.flags);
    }

    if (Is.array(source)) {
      return Clone.array(source);
    }

    const clone = {};
    const sourcePropertyNames = Object.getOwnPropertyNames(source);

    sourcePropertyNames.forEach((name) => {
      clone[name] = Clone.clone(source[name]);
    });

    return clone;
  }

  static function(fn) {
    return function clonedFn(...args) {
      return fn.apply(null, args);
    };
  }

  static array(source) {
    const clone = [];

    source.forEach((value) => {
      clone.push(Clone.clone(value));
    });

    return clone;
  }
}

const clone = (value) => Clone.clone(value);

export default clone;
