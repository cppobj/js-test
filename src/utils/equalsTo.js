const toString = Object.prototype.toString;

function isNull(value) {
  return value === null;
}

function isSameTypeOf(value, other) {
  return typeof value === typeof other;
}

function isArrayEquals(value, other) {
  if (value.length !== other.length) {
    return false;
  }

  return value.every((currentValue, index) => {
    return equalsTo(value[index], other[index]);
  });
}

function isObjectsEquals(value, other) {
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
    return isArrayEquals(value, other);
  }

  // equality to Date
  if (toString.call(value) === '[object Date]' && toString.call(other) === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  // equality to RegExp
  if (toString.call(value) === '[object RegExp]' && toString.call(other) === '[object RegExp]') {
    return value.toString() === other.toString();
  }

  // check for props count
  if (Object.keys(value).length !== Object.keys(other).length) {
    return false;
  }

  for (const prop in value) {
    // check if property exists in other object
    if (!(prop in other)) {
      return false;
    }

    if (!equalsTo(value[prop], other[prop])) {
      return false;
    }
  }

  return true;
}

function equalsTo(value, other) {
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
      return isObjectsEquals(value, other);
    default:
      break;
  }

  return false;
}

export default equalsTo;
