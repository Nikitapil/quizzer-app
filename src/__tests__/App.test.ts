import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { RouterView } from 'vue-router';

import { authApi } from '@/api/apiInstances';

import App from '@/modules/app/App.vue';
import { useAuthStore } from '@/modules/auth/store/AuthStore';

describe('App component test', () => {
  const loaderSelector = '[data-test="round-loader"]';
  authApi.refresh = vi.fn();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render app with loader', () => {
    const wrapper = mount(App);

    const loader = wrapper.find(loaderSelector);

    expect(loader.exists()).toBeTruthy();
  });

  it('should render app with routerView', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          Home: true
        }
      }
    });

    await flushPromises();

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const loader = wrapper.find(loaderSelector);
    const view = wrapper.findComponent(RouterView);

    expect(loader.exists()).toBeFalsy();
    expect(view.exists()).toBeTruthy();
  });
});
