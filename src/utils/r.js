const R = {
  _: {},
  bind: (fn, context, ...args) => {
    const argIndexesThatShouldBeSet = [];

    args.forEach((value, index) => {
      if (value === R._) {
        argIndexesThatShouldBeSet.push(index);
      }
    });

    return function bound(...fnArgs) {
      const newArgs = args.slice(0);

      argIndexesThatShouldBeSet.forEach((indexToSet, index) => {
        newArgs[indexToSet] = fnArgs[index];
      });

      // append other arguments
      if (fnArgs.length > newArgs.length) {
        for (let i = newArgs.length, length = fnArgs.length; i < length; i++) {
          newArgs.push(fnArgs[i]);
        }
      }

      return fn.apply(context, newArgs);
    };
  },
};

export default R;
