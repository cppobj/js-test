import equalsTo from '../../src/utils/equalsTo';

describe('equalsTo', () => {
  it('should compare nulls', () => {
    assert.isTrue(equalsTo(null, null), 'null equals to null');

    assert.isFalse(equalsTo(null, undefined), 'null not equals to undefined');
    assert.isFalse(equalsTo(null, {}), 'null not equals to object');
    assert.isFalse(equalsTo(null, () => {}), 'null not equals to function');
    assert.isFalse(equalsTo(null, 1), 'null not equals to number');
    assert.isFalse(equalsTo(null, 'string'), 'null not equals to string');

    assert.isFalse(equalsTo(undefined, null), 'undefined not equals to null');
    assert.isFalse(equalsTo({}, null), 'object not equals to null');
    assert.isFalse(equalsTo(() => {}, null), 'function not equals to null');
    assert.isFalse(equalsTo(1, null), 'number not equals to null');
    assert.isFalse(equalsTo('string', null), 'string not equals to null');
  });

  it('should compare undefined', () => {
    assert.isTrue(equalsTo(undefined, undefined), 'undefined equals to undefined');

    assert.isFalse(equalsTo(undefined, null), 'undefined not equals to null');
    assert.isFalse(equalsTo(undefined, {}), 'undefined not equals to simple object');
    assert.isFalse(equalsTo(undefined, () => {}), 'undefined not equals to function');
    assert.isFalse(equalsTo(undefined, 1), 'undefined not equals to number');
    assert.isFalse(equalsTo(undefined, 'string'), 'undefined not equals to string');

    assert.isFalse(equalsTo(null, undefined), 'null not equals to undefined');
    assert.isFalse(equalsTo({}, undefined), 'object not equals to undefined');
    assert.isFalse(equalsTo(() => {}, undefined), 'function not equals to undefined');
    assert.isFalse(equalsTo(1, undefined), 'number not equals to undefined');
    assert.isFalse(equalsTo('string', undefined), 'string not equals to undefined');
  });

  it('should compare numbers', () => {
    assert.isTrue(equalsTo(1, 1), 'number equals to number');

    assert.isFalse(equalsTo(1, null), 'number not equals to null');
    assert.isFalse(equalsTo(1, {}), 'number not equals to simple object');
    assert.isFalse(equalsTo(1, () => {}), 'number not equals to function');
    assert.isFalse(equalsTo(1, undefined), 'number not equals to undefined');
    assert.isFalse(equalsTo(1, 'string'), 'number not equals to string');

    assert.isFalse(equalsTo(null, 1), 'null not equals to number');
    assert.isFalse(equalsTo({}, 1), 'object not equals to number');
    assert.isFalse(equalsTo(() => {}, 1), 'function not equals to number');
    assert.isFalse(equalsTo(undefined, 1), 'undefined not equals to number');
    assert.isFalse(equalsTo('string', 1), 'string not equals to number');
  });

  it('should compare strings', () => {
    assert.isTrue(equalsTo('string', 'string'), 'string equals to string');

    assert.isFalse(equalsTo('string', null), 'string not equals to null');
    assert.isFalse(equalsTo('string', {}), 'string not equals to simple object');
    assert.isFalse(equalsTo('string', () => {}), 'string not equals to function');
    assert.isFalse(equalsTo('string', undefined), 'string not equals to undefined');
    assert.isFalse(equalsTo('string', 1), 'string not equals to number');

    assert.isFalse(equalsTo(null, 'string'), 'null not equals to string');
    assert.isFalse(equalsTo({}, 'string'), 'object not equals to string');
    assert.isFalse(equalsTo(() => {}, 'string'), 'function not equals to string');
    assert.isFalse(equalsTo(undefined, 'string'), 'undefined not equals to string');
    assert.isFalse(equalsTo(1, 'string'), 'number not equals to string');
  });
});
