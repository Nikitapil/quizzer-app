import { flushPromises, mount } from '@vue/test-utils';
import AppHeader from '@/modules/app/components/app-header/AppHeader.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('AppHeader tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should open and close mobile bar', async () => {
    const wrapper = mount(AppHeader, {
      attachTo: document.body
    });

    const burgerBtn = wrapper.get('[data-test="burger-btn"]');

    await burgerBtn.trigger('click');

    await flushPromises();

    let mobileBar = wrapper.find('[data-test="mobile-bar"]');

    expect(mobileBar.exists()).toBe(true);

    await wrapper.trigger('click');

    await flushPromises();

    mobileBar = wrapper.find('[data-test="mobile-bar"]');
    expect(mobileBar.exists()).toBe(false);
  });
});
