import { assert } from 'chai';

import clone from '../../src/task1/clone';

describe('clone', () => {
  it('should clone functions', () => {
    const fn = () => 42;
    const clonedFn = clone(fn);

    fn.test = {};

    assert.notProperty(clonedFn, 'test', 'should not have property test');
    assert.equal(clonedFn(), fn(), 'result of function invocation should be same');
  });

  it('should clone objects', () => {
    const obj = {
      a: {
        b: 42,
      },
      c: 24,
    };

    const clonedObj = clone(obj);

    assert.deepEqual(obj, clonedObj, 'should be deeply equal');

    delete obj.c;
    delete obj.a.b;

    assert.property(clonedObj, 'c', 'should have property c');
    assert.equal(clonedObj.c, 24, 'property c should be equals to 24');

    assert.property(clonedObj.a, 'b', 'should have property b');
    assert.equal(clonedObj.a.b, 42, 'property b should be equals to 42');
  });

  it('should clone arrays', () => {
    const arr = [1, { a: 2, b: { c: 3 } }, undefined, null, 'string', true];
    const clonedArr = clone(arr);

    assert.deepEqual(arr, clonedArr, 'cloned array should save as source');

    delete arr[1].b.c;

    assert.property(clonedArr[1].b, 'c', 'cloned element should have property c');

    arr.length = 0;

    assert.equal(clonedArr.length, 6, 'changes on source should not have affect to clone');
  });

  it('should clone dates', () => {
    const now = new Date();
    const clonedNow = clone(now);

    assert.equal(now.getTime(), clonedNow.getTime(), 'dates should be the same');

    now.setMonth(now.getMonth() + 1);

    assert.notEqual(now.getMonth(), clonedNow.getMonth(),
      'changing the original object should not has affect to clone'
    );
  });

  it('should clone regular expressions', () => {
    const regexp = /abc/im;
    const clonedRegexp = clone(regexp);

    assert(regexp !== clonedRegexp, 'cloned has other reference');
    assert.equal(regexp.source, clonedRegexp.source, 'should have same source');
    assert.equal(regexp.flags, clonedRegexp.flags, 'should have same flags');
  });
});
