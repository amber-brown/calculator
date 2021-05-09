const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '/': (left, right) => Math.trunc(left / right),
  '*': (left, right) => left * right,
};
const OPERATOR_PRECEDENCE = {
  '+': 2,
  '-': 2,
  '/': 3,
  '*': 3,
};

export const isDigit = (char) => /\d/.test(char);

export const isOperator = (char) => /[-+*/]/.test(char);

export const tokenizer = (string) => {
  if (typeof string !== 'string' || !string.length) {
    return [];
  }

  const charArray = string.replace(' ', '').split('');

  return charArray.reduce((tokens, char) => {
    if (isDigit(char)) {
      const lastToken = tokens[tokens.length - 1];
      if (tokens.length > 0 && lastToken && lastToken.type === 'Number') {
        lastToken.value = `${lastToken.value}${char}`;
      } else {
        tokens.push({ type: 'Number', value: char });
      }
    }
    if (isOperator(char)) {
      tokens.push({ type: 'Operator', value: char, precedence: OPERATOR_PRECEDENCE[char] });
    }
    return tokens;
  }, []);
};

export const shuntingYardAlgorithm = (tokens) => {
  const getLastElement = (arr) => Array.isArray(arr) && arr[arr.length - 1];

  const { outputStack, operatorStack } = tokens.reduce((acc, token) => {
    if (token.type === 'Operator') {
      while (
        getLastElement(acc.operatorStack)
        && getLastElement(acc.operatorStack)?.precedence >= token.precedence
      ) {
        acc.outputStack.push(acc.operatorStack.pop().value);
      }
      acc.operatorStack.push(token);
      return acc;
    }

    acc.outputStack.push(token.value);
    return acc;
  }, { outputStack: [], operatorStack: [] });

  while (operatorStack.length) {
    outputStack.push(operatorStack.pop().value);
  }
  return outputStack;
};

export const calculate = (equation) => {
  const [sum] = equation.reduce((stack, token) => {
    if (isDigit(token)) {
      stack.push(parseInt(token, 10));
    }
    if (isOperator(token)) {
      const operation = OPERATIONS[token];
      const right = stack.pop();
      const left = stack.pop();
      const result = operation(left, right);
      stack.push(result);
    }
    return stack;
  }, []);
  return sum;
};
