import { vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import { useAuthStore } from '@/modules/auth/store/AuthStore';

import { UserReturnDtoMock } from '@/api/swagger/Auth/mock';

import { ERoutesNames } from '@/router/routes-names';
import { RouterLink } from 'vue-router';
import { testRouter } from '../../vitest.setup';

import AuthForm from '@/modules/auth/components/AuthForm.vue';
import SignUp from '@/modules/auth/pages/SignUp.vue';

describe('SignUn component tests', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
  });

  it('should render loader if auth isLoading', () => {
    const wrapper = mount(SignUp);

    const loader = wrapper.find('[data-test="round-loader"]');

    expect(loader.exists()).toBe(true);
  });

  it('should render sign up form', async () => {
    const wrapper = mount(SignUp);

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const authForm = wrapper.findComponent(AuthForm);

    expect(authForm.exists()).toBe(true);
    expect(authForm.props('useSignUp')).toBe(true);
  });

  it('should navigate to sign in page', async () => {
    const wrapper = mount(SignUp);

    const store = useAuthStore();

    store.isLoading = false;

    await flushPromises();

    const signUpLink = wrapper.findComponent(RouterLink);

    await signUpLink.trigger('click');

    await flushPromises();

    expect(testRouter.currentRoute.value.name).toBe(ERoutesNames.SIGN_IN);
  });

  it('should call store register function on login', async () => {
    const wrapper = mount(SignUp);

    const store = useAuthStore();

    store.isLoading = false;

    const registerSpy = vi
      .spyOn(store, 'register')
      .mockImplementation(async () => {
        store.user = UserReturnDtoMock.create();
      });

    await flushPromises();

    const form = wrapper.get('form');
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    const passwordConfirm = wrapper.find('#confirm-password');
    const usernameInput = wrapper.find('#username');

    await emailInput.setValue('test@test.test');
    await passwordInput.setValue('12345678');
    await passwordConfirm.setValue('12345678');
    await usernameInput.setValue('test user');

    await form.trigger('submit');

    await flushPromises();

    expect(registerSpy).toHaveBeenCalled();
  });
});
