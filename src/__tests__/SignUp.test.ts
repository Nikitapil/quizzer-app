import { flushPromises, mount } from '@vue/test-utils';
import { i18n } from '@/main';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ERoutesNames } from '@/router/routes-names';
import { RouterLink } from 'vue-router';
import SignUp from '@/modules/auth/views/SignUp.vue';
import { UserRolesEnum } from '@/domain/contracts';

describe('SignUn component tests', () => {
  it('should render loader if auth isLoading', () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render sign up form', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const inputs = wrapper.findAll('input');
    const usernameInput = wrapper.find('#username');

    expect(inputs.length).toBe(3);
    expect(usernameInput.exists()).toBe(true);
  });

  it('should redirect if is authenticated', async () => {
    mount(SignUp, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;
    store.user = {
      id: 1,
      username: 'Test user',
      email: 'test@test.test',
      role: UserRolesEnum.User
    };

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.HOME);
  });

  it('should navigate to sign in page', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const signUpLink = wrapper.findComponent(RouterLink);

    await signUpLink.trigger('click');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.SIGN_IN);
  });

  it('should call store register function on login', async () => {
    const wrapper = mount(SignUp, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    store.register = async () => {
      store.user = {
        id: 1,
        username: 'Test user',
        email: 'test@test.test',
        role: UserRolesEnum.User
      };
    };

    await flushPromises();

    const form = wrapper.get('form');
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    const usernameInput = wrapper.find('#username');

    await emailInput.setValue('test@test.test');
    await passwordInput.setValue('12345678');
    await usernameInput.setValue('test user');

    await form.trigger('submit');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.HOME);
  });
});
