import { mount } from '@vue/test-utils';
import AppSelect from '@/components/inputs/AppSelect.vue';

describe('AppSelect tests', () => {
  const options = [
    {
      name: 'option 1',
      value: 'option_1'
    },
    {
      name: 'option 2',
      value: 'option_2'
    },
    {
      name: 'option 3',
      value: 'option_3'
    }
  ];

  const wrapper = mount(AppSelect, {
    props: {
      options,
      'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
    }
  });

  beforeEach(async () => {
    await wrapper.setProps({ options });
  });

  it('should render select without label', () => {
    const select = wrapper.get('[data-test="app-select"]');
    const label = wrapper.find('[data-test="app-select-label"]');

    expect(select.classes()).toContain('input');
    expect(label.exists()).toBeFalsy();
  });

  it('should render select with label', async () => {
    const labelText = 'Test label';
    await wrapper.setProps({ label: labelText });

    const select = wrapper.get('[data-test="app-select"]');
    const label = wrapper.get('[data-test="app-select-label"]');

    expect(select.classes()).toContain('input');
    expect(label.text()).toBe(labelText);
  });

  it('should contain 3 options', () => {
    const optionsEls = wrapper.findAll('option');

    expect(optionsEls).toHaveLength(options.length);
  });

  it('should handle select change', async () => {
    await wrapper.setProps({ modelValue: 'option_1' });

    const select = wrapper.get('[data-test="app-select"]');

    expect((select.element as HTMLSelectElement).value).toBe('option_1');

    const opts: any = wrapper.findAll('option');

    await opts?.at(1)?.setSelected();

    expect((select.element as HTMLSelectElement).value).toBe('option_2');
    expect(wrapper.props('modelValue')).toBe('option_2');
  });
});
