import { mount } from '@vue/test-utils';
import AppButton from '@/components/buttons/AppButton.vue';
import { expect } from 'vitest';

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
    expect(button.classes()).not.toContain('loading');
  });

  it('should emit click event', () => {
    const button = wrapper.get('button');

    button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should show loader', async () => {
    await wrapper.setProps({ isLoading: true });
    const loader = wrapper.find('[data-test="round-loader"]');
    expect(loader.exists()).toBe(true);
    expect(wrapper.get('button').classes()).toContain('loading');
  });
});
