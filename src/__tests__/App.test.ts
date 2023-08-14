import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { flushPromises, mount } from '@vue/test-utils';
import App from '@/modules/app/App.vue';
import { i18n } from '@/main';
import router from '@/router';
import { RouterView } from 'vue-router';

describe('App component test', () => {
  it('should render app with loader', () => {
    const pinia = createTestingPinia();
    const store = useAuthStore(pinia);
    store.refresh = async () => {};

    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBeTruthy();
  });

  it('should render app with routerView', async () => {
    const pinia = createTestingPinia();
    const store = useAuthStore(pinia);
    store.refresh = async () => {};

    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    store.isLoading = false;

    await flushPromises();

    const loader = wrapper.find('[data-test="round-loader"]');
    const view = wrapper.getComponent(RouterView);

    expect(loader.exists()).toBeFalsy();
    expect(view.exists()).toBeTruthy();
  });
});
