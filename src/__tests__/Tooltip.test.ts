import { mount } from '@vue/test-utils';
import Tooltip from '@/components/Tooltip.vue';

describe('Tooltip component tests', () => {
  it('should open tooltip', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        tip: 'Test'
      }
    });

    const trigger = wrapper.get('[data-test="tip-content"]');

    await trigger.trigger('mouseover');

    const tip = wrapper.get('[data-test="tip"]');

    expect(tip.isVisible()).toBeTruthy();
    expect(tip.text()).toBe('Test');
  });
});
