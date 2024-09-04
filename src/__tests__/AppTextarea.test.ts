import { expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AppTextarea from '@/components/inputs/AppTextarea.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

describe('should focus on mount if have props focusOnMount', () => {
  const appTextAreaSelector = '[data-test="app-text-area"]';

  it('should focus field on mount if props focusOnMount', async () => {
    const wrapper = mount(AppTextarea, {
      props: {
        modelValue: '',
        name: 'test-name',
        id: 'test-id',
        focusOnMount: true
      },
      attachTo: document.body
    });
    const input = wrapper.get(appTextAreaSelector);

    expect(input.element).toBe(document.activeElement);
  });

  it('should render input with correct props', async () => {
    const props = {
      placeholder: 'Test placeholder',
      name: 'test-input',
      id: 'test-input-id',
      label: 'super test',
      disabled: false
    };

    const wrapper = mount(AppTextarea, {
      props,
      attachTo: document.body
    });

    const input = wrapper.get(appTextAreaSelector);

    const label = wrapper.get('[data-test="textarea-label"]');

    expect(label.text()).toBe(props.label);
    expect(input.attributes('placeholder')).toBe(props.placeholder);
    expect(input.classes()).not.toContain('error');
    expect(input.attributes('name')).toBe(props.name);
    expect(input.attributes('id')).toBe(props.id);
    expect(label.attributes('for')).toBe(props.id);
  });

  it('should handle update modelValue', async () => {
    const wrapper = mount(AppTextarea, {
      props: {
        modelValue: '',
        name: 'test-name',
        id: 'test-id',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.get(appTextAreaSelector);

    await input.setValue('test');

    expect((input.element as HTMLInputElement).value).toBe('test');
    expect(wrapper.props('modelValue')).toBe('test');
  });

  test('should validate correct', async () => {
    const wrapper = mount(AppTextarea, {
      props: {
        id: 'test-input',
        name: 'test-input',
        rules: 'required',
        modelValue: '',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e })
      }
    });

    const input = wrapper.find(appTextAreaSelector);

    await input.trigger('focus');

    await input.trigger('blur');

    await flushPromises();

    const error = wrapper.findComponent(ErrorMessage);

    expect(input.classes()).toContain('error');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Field is required');
  });
});
