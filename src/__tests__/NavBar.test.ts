import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, mount } from '@vue/test-utils';

import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { RouterLink } from 'vue-router';

import NavBar from '@/modules/app/components/app-header/NavBar.vue';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

describe('NavBar tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render loader if authLoading', () => {
    const wrapper = mount(NavBar);
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
      user: UserReturnDtoMock.create()
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

    authStore.user = UserReturnDtoMock.create();

    authStore.logout = async () => {
      authStore.user = null;
    };

    const wrapper = mount(NavBar);

    const logoutBtn = wrapper.find('[data-test="logout"]');

    await logoutBtn.trigger('click');

    expect(authStore.user).toBe(null);
  });
});
