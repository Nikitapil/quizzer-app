import { flushPromises, mount } from '@vue/test-utils';
import AuthForm from '@/modules/auth/components/AuthForm.vue';

describe('AuthForm component tests', () => {
  const usernameInputSelector = '#username';
  const confirmPasswordInputSelector = '#confirm-password';
  const emailInputSelector = '#email';
  const passwordInputSelector = '#password';

  const wrapper = mount(AuthForm, {
    props: {
      title: 'Auth form',
      submitBtnText: 'Sign up',
      useSignUp: false
    }
  });

  it('should not render inputs for sign up in sign in form', () => {
    const usernameInput = wrapper.find(usernameInputSelector);
    const confirmPasswordInput = wrapper.find(confirmPasswordInputSelector);

    expect(usernameInput.exists()).toBe(false);
    expect(confirmPasswordInput.exists()).toBe(false);
  });

  it('should render sign up form inputs', async () => {
    await wrapper.setProps({ useSignUp: true });

    const usernameInput = wrapper.find(usernameInputSelector);
    const confirmPasswordInput = wrapper.find(confirmPasswordInputSelector);

    expect(usernameInput.exists()).toBe(true);
    expect(confirmPasswordInput.exists()).toBe(true);
  });

  it('should validate form correctly', async () => {
    const form = wrapper.get('form');
    const emailInput = wrapper.find(emailInputSelector);
    const passwordInput = wrapper.find(passwordInputSelector);
    const passwordConfirmInput = wrapper.find(confirmPasswordInputSelector);
    const usernameInput = wrapper.find(usernameInputSelector);

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    await emailInput.setValue('test');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    await emailInput.setValue('test@test.test');
    await passwordInput.setValue('123');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    await passwordInput.setValue('12345678');
    await passwordConfirmInput.setValue('12345678');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    await usernameInput.setValue('test user');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
