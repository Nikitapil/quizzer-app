import { flushPromises, mount } from '@vue/test-utils';
import SignIn from '@/modules/auth/views/SignIn.vue';
import { i18n } from '@/main';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ERoutesNames } from '@/router/routes-names';
import { RouterLink } from 'vue-router';

describe('SignIn component tests', () => {
  it('should render loader if auth isLoading', () => {
    const wrapper = mount(SignIn, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render sign in form', async () => {
    const wrapper = mount(SignIn, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const inputs = wrapper.findAll('input');
    const usernameInput = wrapper.find('#username');

    expect(inputs.length).toBe(2);
    expect(usernameInput.exists()).toBe(false);
  });

  it('should redirect if is authenticated', async () => {
    mount(SignIn, {
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
      role: 'User'
    };

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.HOME);
  });

  it('should render restore password button', async () => {
    const wrapper = mount(SignIn, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const restoreBtn = wrapper.find('#restore-btn');

    expect(restoreBtn.exists()).toBe(true);
  });

  it('should navigate to sign up page', async () => {
    const wrapper = mount(SignIn, {
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

    expect(router.currentRoute.value.name).toBe(ERoutesNames.SIGN_UP);
  });

  it('should call store login function on login', async () => {
    const wrapper = mount(SignIn, {
      global: {
        plugins: [i18n, router, createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    store.login = async () => {
      store.user = {
        id: 1,
        username: 'Test user',
        email: 'test@test.test',
        role: 'User'
      };
    };

    await flushPromises();

    const form = wrapper.get('form');
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');

    await emailInput.setValue('test@test.test');
    await passwordInput.setValue('12345678');

    await form.trigger('submit');

    await flushPromises();

    expect(router.currentRoute.value.name).toBe(ERoutesNames.HOME);
  });

  it('should open restore password modal', async () => {
    const pinia = createTestingPinia();
    const store = useAuthStore(pinia);

    store.isLoading = false;
    const wrapper = mount(SignIn, {
      global: {
        plugins: [i18n, router, pinia]
      }
    });

    const restoreBtn = wrapper.get('#restore-btn');

    await restoreBtn.trigger('click');

    const modal = wrapper.find('[data-test]="modal"');

    expect(modal.exists()).toBe(true);
  });
});
