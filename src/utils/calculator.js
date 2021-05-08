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
      tokens.push({ type: 'Operator', value: char });
    }
    return tokens;
  }, []);
};

export const equate = (tokens) => {
  console.log(tokens);
};
