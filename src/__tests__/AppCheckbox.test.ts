import { mount } from '@vue/test-utils';
import AppCheckbox from '@/components/inputs/AppCheckbox.vue';

describe('AppCheckbox tests', () => {
  it('should render checkbox', () => {
    const wrapper = mount(AppCheckbox, {
      props: {
        id: 'test-id',
        label: 'Test label',
        modelValue: '',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    });

    const labelText = wrapper.get('[data-test="checkbox-label"]');

    expect(labelText.text()).toBe('Test label');
  });
});
