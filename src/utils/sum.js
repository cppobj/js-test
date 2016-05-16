function sum(a) {
  const args = [];

  args.push(a);

  const memo = function memo(b) {
    args.push(b);

    return memo;
  };

  memo.valueOf = function valueOf() {
    let sumResult = 0;

    args.forEach((value) => {
      sumResult += value;
    });

    return sumResult;
  };

  return memo;
}

export default sum;
