const toString = Object.prototype.toString;

function isNull(value) {
  return value === null;
}

function isSameTypeOf(value, other) {
  return typeof value === typeof other;
}

export class Equals {
  static to(value, other) {
    if (!isSameTypeOf(value, other)) {
      return false;
    }

    const type = typeof value;

    switch (type) {
      case 'undefined':
        return true;
      case 'number':
      case 'string':
      case 'boolean':
      case 'function':
        return value === other;
      case 'object':
        return Equals.isObjectsEquals(value, other);
      default:
        break;
    }

    return false;
  }

  static isArrayEquals(value, other) {
    if (value.length !== other.length) {
      return false;
    }

    return value.every((currentValue, index) => Equals.to(value[index], other[index]));
  }

  static isObjectsEquals(value, other) {
    // equality to null
    if (isNull(value) && isNull(other)) {
      return true;
    }

    if (isNull(value) && !isNull(other)
      || !isNull(value) && isNull(other)
    ) {
      return false;
    }

    // equality to array
    if (Array.isArray(value) && Array.isArray(other)) {
      return Equals.isArrayEquals(value, other);
    }

    // equality to Date
    if (toString.call(value) === '[object Date]' && toString.call(other) === '[object Date]') {
      return value.getTime() === other.getTime();
    }

    // equality to RegExp
    if (toString.call(value) === '[object RegExp]' && toString.call(other) === '[object RegExp]') {
      return value.toString() === other.toString();
    }

    const valuePropertyNames = Object.getOwnPropertyNames(value);
    const otherPropertyNames = Object.getOwnPropertyNames(other);

    // check for props count
    if (valuePropertyNames.length !== otherPropertyNames.length) {
      return false;
    }

    return valuePropertyNames.every((propertyName) => {
      if (!(propertyName in other)) {
        return false;
      }

      return Equals.to(value[propertyName], other[propertyName]);
    });
  }
}

const equalsTo = (value, other) => Equals.to(value, other);

export default equalsTo;
