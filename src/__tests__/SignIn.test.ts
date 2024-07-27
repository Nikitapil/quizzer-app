import { flushPromises, mount } from '@vue/test-utils';
import SignIn from '@/modules/auth/pages/SignIn.vue';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/modules/auth/store/AuthStore';
import { ERoutesNames } from '@/router/routes-names';
import { RouterLink } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import AuthForm from '@/modules/auth/components/AuthForm.vue';
import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';
import { vi } from 'vitest';

describe('SignIn component tests', () => {
  setActivePinia(createPinia());
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const wrapper = mount(SignIn);
  it('should render loader if auth isLoading', () => {
    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render sign in form', async () => {
    const wrapper = mount(SignIn);

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const authForm = wrapper.findComponent(AuthForm);

    expect(authForm.exists()).toBe(true);
    expect(authForm.props('useSignUp')).toBe(false);
  });

  it('should render restore password button', async () => {
    const wrapper = mount(SignIn);

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const restoreBtn = wrapper.find('#restore-btn');

    expect(restoreBtn.exists()).toBe(true);
  });

  it('should navigate to sign up page', async () => {
    const wrapper = mount(SignIn, {
      global: {
        plugins: [createTestingPinia()]
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
        plugins: [createTestingPinia()]
      }
    });

    const store = useAuthStore();

    store.isLoading = false;

    const loginSpy = vi.spyOn(store, 'login').mockImplementation(async () => {
      store.user = UserReturnDtoMock.create();
    });

    await flushPromises();

    const form = wrapper.get('form');
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');

    await emailInput.setValue('test@test.test');
    await passwordInput.setValue('12345678');

    await form.trigger('submit');

    await flushPromises();

    expect(loginSpy).toHaveBeenCalled();
  });

  it('should open restore password modal', async () => {
    const wrapper = mount(SignIn);

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const restoreBtn = wrapper.get('#restore-btn');

    await restoreBtn.trigger('click');

    const modal = wrapper.find('[data-test]="modal"');

    expect(modal.exists()).toBe(true);
  });
});
