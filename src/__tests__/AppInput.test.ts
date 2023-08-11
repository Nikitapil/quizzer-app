import { describe } from 'vitest';
import { mount } from '@vue/test-utils';
import AppInput from '../components/inputs/AppInput.vue';

describe('AppInput component test', () => {
  it('should render input without label', () => {
    const wrapper = mount(AppInput);

    const input = wrapper.get('[data-test="app-input"]');

    const label = wrapper.find('label');

    expect(input.attributes('type')).toBe('text');
    expect(label.exists()).toBeFalsy();
  });

  it('should render input with correct props', () => {
    const wrapper = mount(AppInput, {
      props: {
        type: 'email',
        placeholder: 'Test placeholder',
        isError: false,
        name: 'test-input',
        id: 'test-input-id',
        label: 'super test',
        disabled: false
      }
    });

    const input = wrapper.get('[data-test="app-input"]');

    const label = wrapper.get('[data-test="app-input-label"]');

    expect(input.attributes('type')).toBe('email');
    expect(label.text()).toBe('super test');
    expect(input.attributes('placeholder')).toBe('Test placeholder');
    expect(input.classes()).not.toContain('error');
    expect(input.attributes('name')).toBe('test-input');
    expect(input.attributes('id')).toBe('test-input-id');
    expect(label.attributes('for')).toBe('test-input-id');
  });

  it('should render with error class', () => {
    const wrapper = mount(AppInput, {
      props: {
        placeholder: 'Test placeholder',
        isError: true
      }
    });
    const input = wrapper.get('[data-test="app-input"]');
    expect(input.classes()).toContain('error');
  });

  it('should handle update modelValue', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    });
    const input = wrapper.get('[data-test="app-input"]');

    await input.setValue('test');

    expect((input.element as HTMLInputElement).value).toBe('test');
    expect(wrapper.props('modelValue')).toBe('test');
  });

  it('should focus input on mount if props focusOnMount', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        focusOnMount: true
      },
      attachTo: document.body
    });
    const input = wrapper.get('[data-test="app-input"]');

    expect(input.element).toBe(document.activeElement);
  });
});
