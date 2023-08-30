import { flushPromises, mount } from '@vue/test-utils';
import AppHeader from '@/modules/app/components/app-header/AppHeader.vue';
import { i18n } from '@/main';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';

describe('AppHeader tests', () => {
  it('should open mobile bar', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      },
      attachTo: document.body
    });

    wrapper.vm.toggleMobileBar();

    await flushPromises();

    let mobileBar = wrapper.find('[data-test="mobile-bar"]');

    expect(mobileBar.exists()).toBe(true);

    await wrapper.trigger('click');

    mobileBar = wrapper.find('[data-test="mobile-bar"]');
    expect(mobileBar.exists()).toBe(false);
  });
});
