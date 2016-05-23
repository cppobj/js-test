import { assert } from 'chai';

import sum from '../../src/task1/sum';

describe('sum', () => {
  it('should calculate sum', () => {
    assert.equal(sum(7).valueOf(), 7, 'should return 7');
    assert.equal(sum(1)(2)(3).valueOf(), 6, 'should return 6');
    assert.equal(sum(1)(2).valueOf(), 3, 'should return 3');
    assert.equal(sum(1)(1)(11)(1)(2).valueOf(), 16, 'should return 16');
    assert.equal(sum(1)(2)(3)(4)(5)(6)(7)(8)(9).valueOf(), 45, 'should return 45');
  });
});
