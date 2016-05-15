function sum(a) {
  let args = [];
  
  args.push(a);
  
  let memo = function (b) {
    args.push(b);
    
    return memo;
  };
  
  memo.valueOf = function () {
    let sum = 0;
    
    args.forEach(function (value) {
      sum += value;
    });
    
    return sum;
  };
  
  return memo;
}

export default sum;