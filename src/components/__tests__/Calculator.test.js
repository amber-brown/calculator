import { shallowMount } from '@vue/test-utils';
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
});
