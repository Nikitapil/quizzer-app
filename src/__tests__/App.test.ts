import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { flushPromises, mount } from '@vue/test-utils';
import App from '@/modules/app/App.vue';
import { RouterView } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';

describe('App component test', () => {
  const setup = () => {
    setActivePinia(createPinia());
  };

  beforeEach(() => {
    setup();
  });
  it('should render app with loader', () => {
    const store = useAuthStore();
    store.refresh = async () => {};

    const wrapper = mount(App);

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBeTruthy();
  });

  it('should render app with routerView', async () => {
    const store = useAuthStore();
    store.refresh = async () => {};

    const wrapper = mount(App);

    store.isLoading = false;

    await flushPromises();

    const loader = wrapper.find('[data-test="round-loader"]');
    const view = wrapper.findComponent(RouterView);

    expect(loader.exists()).toBeFalsy();
    expect(view.exists()).toBeTruthy();
  });
});
