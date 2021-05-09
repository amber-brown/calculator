import { shallowMount } from '@vue/test-utils';
import * as calculator from '@/utils/calculator';
import Calculator from '../Calculator.vue';

let wrapper;

const numberButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operaterButtons = ['+', '-', '/', '*'];
const functionalButtons = ['c', '='];

const findButtonContainingText = (text) => wrapper
  .findAll('button')
  .filter((node) => node.text().valueOf() === text)
  .at(0);

describe('Calculator', () => {
  beforeEach(() => {
    wrapper = shallowMount(Calculator);
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('displays the buttons', () => {
    numberButtons.forEach((number) => {
      expect(wrapper.text()).toContain(number);
    });

    operaterButtons.forEach((number) => {
      expect(wrapper.text()).toContain(number);
    });

    functionalButtons.forEach((number) => {
      expect(wrapper.text()).toContain(number);
    });
  });

  test('on button press the output is displayed to the user', () => {
    findButtonContainingText('1').trigger('click');
    expect(wrapper.vm.input).toBe('1');

    findButtonContainingText('2').trigger('click');
    expect(wrapper.vm.input).toBe('12');

    findButtonContainingText('3').trigger('click');
    expect(wrapper.vm.input).toBe('123');

    findButtonContainingText('+').trigger('click');
    expect(wrapper.vm.input).toBe('123+');
  });

  test('if there is no input the user cannot input an operator', () => {
    findButtonContainingText('+').trigger('click');
    expect(wrapper.vm.input).toBe('');

    findButtonContainingText('*').trigger('click');
    expect(wrapper.vm.input).toBe('');
  });

  test('if the last input was an operator the next operator input changes that operator', () => {
    const input = '77+';
    wrapper.setData({ input });

    findButtonContainingText('-').trigger('click');
    expect(wrapper.vm.input).toBe('77-');

    findButtonContainingText('*').trigger('click');
    expect(wrapper.vm.input).toBe('77*');
  });

  test('if the user has entered 0 and presses another number the 0 should be replaced by the new number at the beginning of input', () => {
    const input = '0';
    wrapper.setData({ input });

    findButtonContainingText('1').trigger('click');
    expect(wrapper.vm.input).toBe('1');
  });

  test('if the user has entered 0 and presses another number the 0 should be replaced by the new number', () => {
    const input = '89+0';
    wrapper.setData({ input });

    findButtonContainingText('1').trigger('click');
    expect(wrapper.vm.input).toBe('89+1');
  });

  test('pressing the cancel button clears the input', () => {
    const input = '89+0';
    wrapper.setData({ input });

    findButtonContainingText('c').trigger('click');
    expect(wrapper.vm.input).toBe('');
  });

  test('pressing "=" calculates the equation', () => {
    const calculateSpy = jest.spyOn(calculator, 'calculate');
    const input = '89+0';
    wrapper.setData({ input });

    findButtonContainingText('=').trigger('click');

    expect(calculateSpy).toHaveBeenCalled();
  });

  test('if the user presses "=" and the last input was an operator, it removes the last operator before calculating', () => {
    const input = '4-5*';
    wrapper.setData({ input });

    findButtonContainingText('=').trigger('click');
    expect(wrapper.vm.input).toBe('4-5');
  });

  test('if there is a result and the user enters an operator the result becomes the first part of the input', () => {
    const result = '3';
    const input = '2+1';
    wrapper.setData({ input, result });

    findButtonContainingText('+').trigger('click');
    expect(wrapper.vm.result).toBe('');
    expect(wrapper.vm.input).toBe('3+');
  });

  test('if there is a result and the user enters a digit, the result and the input are cleared and the digit is displayed as the input', () => {
    const result = '3';
    const input = '2+1';
    wrapper.setData({ input, result });

    findButtonContainingText('6').trigger('click');
    expect(wrapper.vm.result).toBe('');
    expect(wrapper.vm.input).toBe('6');
  });
});
