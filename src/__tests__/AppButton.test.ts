import { mount } from '@vue/test-utils';
import AppButton from '@/components/AppButton.vue';

describe('AppButton tests', () => {
  it('should render button with correct classes', () => {
    const wrapper = mount(AppButton, {
      props: {
        appearence: 'primary',
        full: true,
        size: 'md'
      }
    });

    const button = wrapper.get('button');

    expect(button.classes()).toContain('button');
    expect(button.classes()).toContain('primary');
    expect(button.classes()).toContain('full-width');
    expect(button.classes()).toContain('md');
  });

  it('should emit click event', () => {
    const wrapper = mount(AppButton, {
      props: {
        appearence: 'primary',
        full: true,
        size: 'md'
      }
    });

    const button = wrapper.get('button');

    button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
