import equalsTo from '../../src/utils/equalsTo';

describe('equalsTo', () => {
  it('should comparing nulls', () => {
    assert(equalsTo(null, null) === true, 'null equals to null');
  });
});
