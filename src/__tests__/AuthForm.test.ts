import { flushPromises, mount } from '@vue/test-utils';
import AuthForm from '@/modules/auth/components/AuthForm.vue';
import { i18n } from '@/main';
import router from '@/router';

describe('AuthForm component tests', () => {
  it('should render sign in form', () => {
    const wrapper = mount(AuthForm, {
      props: {
        title: 'Auth form',
        submitBtnText: 'Sign up',
        useSignUp: false
      },
      global: {
        plugins: [i18n, router]
      }
    });

    const inputs = wrapper.findAll('input');
    const usernameInput = wrapper.find('#username');

    expect(inputs.length).toBe(2);
    expect(usernameInput.exists()).toBe(false);
  });

  it('should render sign up form', () => {
    const wrapper = mount(AuthForm, {
      props: {
        title: 'Auth form',
        submitBtnText: 'Sign up',
        useSignUp: true
      },
      global: {
        plugins: [i18n, router]
      }
    });

    const inputs = wrapper.findAll('input');
    const usernameInput = wrapper.find('#username');

    expect(inputs.length).toBe(3);
    expect(usernameInput.exists()).toBe(true);
  });

  it('should validate form correctly', async () => {
    const wrapper = mount(AuthForm, {
      props: {
        title: 'Auth form',
        submitBtnText: 'Sign up',
        useSignUp: true
      },
      global: {
        plugins: [i18n, router]
      }
    });

    const form = wrapper.get('form');
    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    const usernameInput = wrapper.find('#username');

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

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    await usernameInput.setValue('test user');

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
