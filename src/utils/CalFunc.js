export function calculateExpression(expr) {
  const nums = [];
  const ops = [];

  const precedence = (op) => {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
  };

  const applyOp = () => {
    const b = nums.pop();
    const a = nums.pop();
    const op = ops.pop();

    switch (op) {
      case '+': nums.push(a + b); break;
      case '-': nums.push(a - b); break;
      case '*': nums.push(a * b); break;
      case '/': nums.push(a / b); break;
      default: break;
    }
  };

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];

    // Handle spaces
    if (ch === ' ') continue;

    // Handle numbers (multi-digit)
    if (!isNaN(ch)) {
      let num = '';
      while (i < expr.length && !isNaN(expr[i]) && expr[i] !== ' ') {
        num += expr[i++];
      }
      i--;
      nums.push(Number(num));
    }

    // Handle operators
    else {
      while (
        ops.length &&
        precedence(ops[ops.length - 1]) >= precedence(ch)
      ) {
        applyOp();
      }
      ops.push(ch);
    }
  }

  while (ops.length) applyOp();

  return nums[0];
}
