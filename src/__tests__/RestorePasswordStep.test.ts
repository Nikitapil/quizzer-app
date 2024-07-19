import { flushPromises, mount } from '@vue/test-utils';
import RestorePasswordStep from '@/modules/auth/components/restore-form/RestorePasswordStep.vue';

describe('RestorePasswordStep tests', () => {
  it('should validate values before submit', async () => {
    const wrapper = mount(RestorePasswordStep);

    const form = wrapper.get('form');
    await form.trigger('submit');

    await flushPromises();
    expect(wrapper.emitted('submit')).toBeFalsy();
  });

  it('should emit submit event', async () => {
    const keyValue = '123456';
    const passwordValue = '12345678';

    const wrapper = mount(RestorePasswordStep);

    const restoreKeyInput = wrapper.get('#restore_key');
    const newPasswordInput = wrapper.get('#new_password');

    await restoreKeyInput.setValue(keyValue);
    await newPasswordInput.setValue(passwordValue);

    const form = wrapper.get('form');
    await form.trigger('submit');

    await flushPromises();
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')?.[0]).toEqual([
      {
        key: keyValue,
        password: passwordValue
      }
    ]);
  });
});
