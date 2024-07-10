import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AppInput from '../components/inputs/AppInput.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

describe('AppInput component test', () => {
  const defaultProps = {
    name: 'test-name',
    id: 'test-id',
    'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
  };

  const wrapper = mount(AppInput, {
    props: defaultProps
  });

  beforeEach(async () => {
    await wrapper.setProps(defaultProps);
  });

  it('should render input without label', () => {
    const input = wrapper.get('[data-test="app-input"]');

    const label = wrapper.find('label');

    expect(input.attributes('type')).toBe('text');
    expect(label.exists()).toBeFalsy();
  });

  it('should render input with correct props', async () => {
    const props = {
      type: 'email',
      placeholder: 'Test placeholder',
      name: 'test-input',
      id: 'test-input-id',
      label: 'super test',
      disabled: false
    } as const;

    await wrapper.setProps(props);

    const input = wrapper.get('[data-test="app-input"]');

    const label = wrapper.get('[data-test="app-input-label"]');

    expect(input.attributes('type')).toBe(props.type);
    expect(label.text()).toBe(props.label);
    expect(input.attributes('placeholder')).toBe(props.placeholder);
    expect(input.classes()).not.toContain('error');
    expect(input.attributes('name')).toBe(props.name);
    expect(input.attributes('id')).toBe(props.id);
    expect(label.attributes('for')).toBe(props.id);
  });

  it('should handle update modelValue', async () => {
    await wrapper.setProps({
      modelValue: '',
      name: 'test-name',
      id: 'test-id'
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
        name: 'test-name',
        id: 'test-id',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e }),
        focusOnMount: true
      },
      attachTo: document.body
    });
    const input = wrapper.get('[data-test="app-input"]');

    expect(input.element).toBe(document.activeElement);
  });

  test('should validate correct', async () => {
    const wrapper = mount(AppInput, {
      props: {
        id: 'test-input',
        name: 'test-input',
        rules: 'required',
        modelValue: '',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find('input');

    await input.trigger('focus');

    await input.trigger('blur');

    await flushPromises();

    const error = wrapper.findComponent(ErrorMessage);

    expect(input.classes()).toContain('error');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Field is required');
  });
});
