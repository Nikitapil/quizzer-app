import { flushPromises, mount } from '@vue/test-utils';
import AppHeader from '@/modules/app/components/AppHeader/AppHeader.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('AppHeader tests', () => {
  const mobileBarSelector = '[data-test="mobile-bar"]';
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

    let mobileBar = wrapper.find(mobileBarSelector);

    expect(mobileBar.exists()).toBe(true);

    await wrapper.trigger('click');

    await flushPromises();

    mobileBar = wrapper.find(mobileBarSelector);
    expect(mobileBar.exists()).toBe(false);
  });
});
