import Calculator from '@/components/Calculator.vue';
import { shallowMount } from '@vue/test-utils';
import App from '../App.vue';

let wrapper;

describe('App', () => {
  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('displays the calculator', () => {
    const calculator = wrapper.findComponent(Calculator);
    expect(calculator.exists()).toBeTruthy();
  });
});
