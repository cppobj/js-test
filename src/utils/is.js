const toString = Object.prototype.toString;

class Is {
  static sameTypeOf(value, other) {
    return typeof value === typeof other;
  }

  static null(value) {
    return Is.is(value, 'Null');
  }

  static array(value) {
    return Array.isArray(value);
  }

  static date(value) {
    return Is.is(value, 'Date');
  }

  static regExp(value) {
    return Is.is(value, 'RegExp');
  }

  static function(value) {
    return typeof value === 'function';
  }

  static generator(fn) {
    return Object.getPrototypeOf(fn).constructor.name === 'GeneratorFunction';
  }

  static promise(value) {
    return value && Is.function(value.then);
  }

  static undefined(value) {
    return typeof value === 'undefined';
  }

  static is(value, type) {
    return toString.call(value) === `[object ${type}]`;
  }
}

export default Is;
