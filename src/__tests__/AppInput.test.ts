import { describe } from 'vitest';
import { mount } from '@vue/test-utils';
import AppInput from '../components/inputs/AppInput.vue';

describe('AppInput component test', () => {
  it('should render input', () => {
    const wrapper = mount(AppInput);

    const input = wrapper.get('[data-test="app-input"]');

    expect(input.attributes('type')).toBe('text');
  });
});
