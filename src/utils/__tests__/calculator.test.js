import * as calculator from '../calculator';

describe('tokenizer', () => {
  it('tokenizes a valid equation', () => {
    const tokens = calculator.tokenizer('123+456/2*4-0');
    expect(tokens).toEqual([
      { type: 'Number', value: '123' },
      { type: 'Operator', value: '+', precedence: 2 },
      { type: 'Number', value: '456' },
      { type: 'Operator', value: '/', precedence: 3 },
      { type: 'Number', value: '2' },
      { type: 'Operator', value: '*', precedence: 3 },
      { type: 'Number', value: '4' },
      { type: 'Operator', value: '-', precedence: 2 },
      { type: 'Number', value: '0' },
    ]);
  });

  it('tokenizes a valid equation containing spaces', () => {
    const tokens = calculator.tokenizer('123 + 456/2 * 4-0');
    expect(tokens).toEqual([
      { type: 'Number', value: '123' },
      { type: 'Operator', value: '+', precedence: 2 },
      { type: 'Number', value: '456' },
      { type: 'Operator', value: '/', precedence: 3 },
      { type: 'Number', value: '2' },
      { type: 'Operator', value: '*', precedence: 3 },
      { type: 'Number', value: '4' },
      { type: 'Operator', value: '-', precedence: 2 },
      { type: 'Number', value: '0' },
    ]);
  });

  it('returns an empty array if an empty string is passed', () => {
    expect(calculator.tokenizer('')).toEqual([]);
  });

  it('returns an empty array for undefined input', () => {
    expect(calculator.tokenizer()).toEqual([]);
  });

  it('return an empty array for non string input', () => {
    expect(calculator.tokenizer(123)).toEqual([]);
  });
});

describe('shunting yard algorithm', () => {
  it('it converts tokens to reverse polish notation', () => {
    const tokens = [
      { type: 'Number', value: '123' },
      { type: 'Operator', value: '+', precedence: 2 },
      { type: 'Number', value: '456' },
      { type: 'Operator', value: '/', precedence: 3 },
      { type: 'Number', value: '2' },
      { type: 'Operator', value: '*', precedence: 3 },
      { type: 'Number', value: '4' },
      { type: 'Operator', value: '-', precedence: 2 },
      { type: 'Number', value: '0' },
    ];

    const reversePolishNotation = calculator.shuntingYardAlgorithm(tokens);
    expect(reversePolishNotation).toStrictEqual(['123', '456', '2', '/', '4', '*', '+', '0', '-']);
  });
});

describe('calculate', () => {
  it('returns the correct answer when given an equation in reverse polish notation', () => {
    const reversePolishNotation = ['123', '456', '2', '/', '4', '*', '+', '0', '-'];
    const result = calculator.calculate(reversePolishNotation);
    expect(result).toBe(1035);
  });
});
