function isNull(value) {
  return value === null;
}

function isSameTypeOf(value, other) {
  return typeof value === typeof other;
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
