import { flushPromises, mount } from '@vue/test-utils';
import NavBar from '@/modules/app/components/app-header/NavBar.vue';
import router from '@/router';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { RouterLink } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { UserRolesEnum } from '@/api/swagger/Auth/data-contracts';
import { createPinia, setActivePinia } from 'pinia';

describe('NavBar tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render loader if authLoading', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
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
        plugins: [router, createTestingPinia()]
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
        plugins: [router, createTestingPinia()]
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

  it('should trigger logout', async () => {
    const pinia = createTestingPinia();

    const authStore = useAuthStore(pinia);

    authStore.isLoading = false;

    authStore.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    authStore.logout = async () => {
      authStore.user = null;
    };

    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia]
      }
    });

    const logoutBtn = wrapper.find('[data-test="logout"]');

    await logoutBtn.trigger('click');

    expect(authStore.user).toBe(null);
  });
});
