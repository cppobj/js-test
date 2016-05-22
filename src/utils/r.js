/*

 function g(a, b, c) {
    console.log(this, a, b, c);
 }

 g(1, 2, 3) // → Window, 1, 2, 3;

 var p1 = R.bind(g, 1, 2, 3, R._);
 p1() // → 1, 2, 3, undefined
 p1(4) // → 1, 2, 3, 4
 var p2 = R.bind(g, 1, R._, 2, 3);
 p2() // → 1, undefined, 2, 3
 p2(4) // → 1, 4, 2, 3
 var p3 = R.bind(g, 1, R._, R._);
 p3() // → 1, undefined, undefined, undefined
 p3(4) // →  1, 4, undefined, undefined
 p3(4,5) // → 1, 4, 5, undefined
 p3(4,5,6) // → 1, 4, 5, 6

*/

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
