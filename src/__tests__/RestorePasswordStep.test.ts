import { flushPromises, mount } from '@vue/test-utils';
import RestorePasswordStep from '@/modules/auth/components/restore-form/RestorePasswordStep.vue';
import { i18n } from '@/main';

describe('RestorePasswordStep tests', () => {
  it('should validate values before submit', async () => {
    const wrapper = mount(RestorePasswordStep, {
      global: {
        plugins: [i18n]
      }
    });

    const form = wrapper.get('form');
    await form.trigger('submit');

    await flushPromises();
    expect(wrapper.emitted('submit')).toBeFalsy();
  });

  it('should emit submit event', async () => {
    const wrapper = mount(RestorePasswordStep, {
      global: {
        plugins: [i18n]
      }
    });

    const restoreKeyInput = wrapper.get('#restore_key');
    const newPasswordInput = wrapper.get('#new_password');

    await restoreKeyInput.setValue('123456');
    await newPasswordInput.setValue('12345678');

    const form = wrapper.get('form');
    await form.trigger('submit');

    await flushPromises();
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      {
        key: '123456',
        password: '12345678'
      }
    ]);
  });
});
