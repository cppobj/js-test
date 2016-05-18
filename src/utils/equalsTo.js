import Is from './is';

export class Equals {
  static to(value, other) {
    if (!Is.sameTypeOf(value, other)) {
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
        return Equals.toObject(value, other);
      default:
        break;
    }

    return false;
  }

  static toArray(value, other) {
    if (value.length !== other.length) {
      return false;
    }

    return value.every((currentValue, index) => Equals.to(value[index], other[index]));
  }

  static toObject(value, other) {
    // equality to null
    if (Is.null(value) && Is.null(other)) {
      return true;
    }

    if (Is.null(value) && !Is.null(other) || !Is.null(value) && Is.null(other)) {
      return false;
    }

    // equality to array
    if (Is.array(value) && Is.array(other)) {
      return Equals.toArray(value, other);
    }

    // equality to Date
    if (Is.date(value) && Is.date(other)) {
      return value.getTime() === other.getTime();
    }

    // equality to RegExp
    if (Is.regExp(value) && Is.regExp(other)) {
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
