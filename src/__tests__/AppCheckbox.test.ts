import { mount } from '@vue/test-utils';
import AppCheckbox from '@/components/inputs/AppCheckbox.vue';

describe('AppCheckbox tests', () => {
  it('should render checkbox', () => {
    const wrapper = mount(AppCheckbox, {
      props: {
        id: 'test-id',
        label: 'Test label',
        modelValue: false,
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    });

    const labelText = wrapper.get('[data-test="checkbox-label"]');

    expect(labelText.text()).toBe('Test label');
  });

  it('should change model value', async () => {
    const wrapper = mount(AppCheckbox, {
      props: {
        id: 'test-id',
        label: 'Test label',
        modelValue: false,
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    });

    const input: any = wrapper.get('input');

    await input.setChecked();

    expect(wrapper.props().modelValue).toBe(true);
  });
});
