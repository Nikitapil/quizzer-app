import { flushPromises, mount } from '@vue/test-utils';
import AppHeader from '@/modules/app/components/app-header/AppHeader.vue';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import type { ComponentPublicInstance } from 'vue';

describe('AppHeader tests', () => {
  it('should open mobile bar', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router, createTestingPinia()],
        stubs: undefined
      },
      attachTo: document.body
    });

    (
      wrapper.vm as ComponentPublicInstance & { toggleMobileBar: () => void }
    ).toggleMobileBar();

    await flushPromises();

    let mobileBar = wrapper.find('[data-test="mobile-bar"]');

    expect(mobileBar.exists()).toBe(true);

    await wrapper.trigger('click');

    await flushPromises();

    mobileBar = wrapper.find('[data-test="mobile-bar"]');
    expect(mobileBar.exists()).toBe(false);
  });
});
