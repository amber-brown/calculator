import { shallowMount } from '@vue/test-utils';
import Calculator from '../Calculator.vue';

let wrapper;

describe('Calculator', () => {
  beforeEach(() => {
    wrapper = shallowMount(Calculator);
  });

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
