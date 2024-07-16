import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, mount } from '@vue/test-utils';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { RouterLink } from 'vue-router';
import { UserRolesEnum } from '@/api/swagger/Auth/data-contracts';

import NavBar from '@/modules/app/components/app-header/NavBar.vue';

describe('NavBar tests', () => {
  setActivePinia(createPinia());

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const wrapper = mount(NavBar);

  it('should render loader if authLoading', () => {
    const loader = wrapper.find('[data-test="horizontal-loader"]');

    expect(loader.exists()).toBeTruthy();
  });

  it('should render auth links', async () => {
    const wrapper = mount(NavBar);
    const store = useAuthStore();
    store.isLoading = false;

    await flushPromises();

    const links = wrapper.findAllComponents(RouterLink);

    expect(links.length).toBe(3);
  });

  it('should render user links', async () => {
    const wrapper = mount(NavBar);

    const store = useAuthStore();

    store.$patch({
      isLoading: false,
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
    const authStore = useAuthStore();

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

    const wrapper = mount(NavBar);

    const logoutBtn = wrapper.find('[data-test="logout"]');

    await logoutBtn.trigger('click');

    expect(authStore.user).toBe(null);
  });
});
