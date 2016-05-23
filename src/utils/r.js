const R = {
  _: {},
  bind: (fn, context, ...args) => {
    const argIndexesThatShouldBeSet = [];

    args.forEach((value, index) => {
      if (value === R._) {
        argIndexesThatShouldBeSet.push(index);
      }
    });

    return function (...fnArgs) {
      const newArgs = args.slice(0);

      argIndexesThatShouldBeSet.forEach((indexToSet, index) => {
        newArgs[indexToSet] = fnArgs[index];
      });

      return fn.apply(context, newArgs);
    };
  },
};

export default R;
