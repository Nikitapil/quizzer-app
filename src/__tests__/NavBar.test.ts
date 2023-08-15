import { flushPromises, mount } from '@vue/test-utils';
import NavBar from '@/modules/app/components/app-header/NavBar.vue';
import { i18n } from '@/main';
import router from '@/router';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { RouterLink } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

describe('NavBar tests', () => {
  it('should render loader if authLoading', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [i18n, router]
      }
    });
    const store = useAuthStore();
    store.isLoading = true;

    const loader = wrapper.find('[data-test="horizontal-loader"]');

    expect(loader.exists()).toBeTruthy();
  });

  it('should render auth links', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });
    const store = useAuthStore();
    store.$patch({ isLoading: false });

    await flushPromises();

    const links = wrapper.findAllComponents(RouterLink);

    expect(links.length).toBe(3);
  });

  it('should render user links', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });
    const store = useAuthStore();
    store.$patch({ isLoading: false });
    store.$patch({
      user: {
        id: 1,
        username: 'Test user',
        email: 'test@test.test'
      }
    });

    await flushPromises();

    const links = wrapper.findAllComponents(RouterLink);
    const logoutBtn = wrapper.find('button');

    expect(links.length).toBe(4);
    expect(logoutBtn.exists()).toBe(true);
  });
});