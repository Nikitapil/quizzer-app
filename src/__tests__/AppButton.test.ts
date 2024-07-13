import { mount } from '@vue/test-utils';
import AppButton from '@/components/buttons/AppButton.vue';

describe('AppButton tests', () => {
  const wrapper = mount(AppButton);

  it('should render button with correct classes', async () => {
    await wrapper.setProps({
      appearence: 'primary',
      full: true,
      size: 'md'
    });

    const button = wrapper.get('button');

    expect(button.classes()).toContain('button');
    expect(button.classes()).toContain('primary');
    expect(button.classes()).toContain('full-width');
    expect(button.classes()).toContain('md');
  });

  it('should emit click event', () => {
    const button = wrapper.get('button');

    button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
