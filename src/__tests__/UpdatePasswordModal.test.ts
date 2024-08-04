import { flushPromises, mount } from '@vue/test-utils';
import UpdatePasswordModal from '@/modules/auth/components/UpdatePasswordModal.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';

describe('UpdatePasswordModal components tests', () => {
  it('should validate values before submit', async () => {
    const wrapper = mount(UpdatePasswordModal, {
      props: {
        modelValue: true,
        isLoading: false
      }
    });

    const form = wrapper.get('form');
    const inputs = wrapper.findAll('input');

    // first input with small length
    await inputs[0].setValue('123');

    await flushPromises();

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    // without second value
    await inputs[0].setValue('12345678');

    await flushPromises();

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    // second value is not equal to the first
    await inputs[1].setValue('1234567');

    await flushPromises();

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeFalsy();

    // all is valid
    await inputs[1].setValue('12345678');

    await flushPromises();

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('should disable inputs and buttons when isLoading', () => {
    const wrapper = mount(UpdatePasswordModal, {
      props: {
        modelValue: true,
        isLoading: true
      }
    });

    const inputs = wrapper.findAllComponents(AppInput);
    const btns = wrapper.findAllComponents(AppButton);

    inputs.forEach((input) => {
      expect(input.props().disabled).toBe(true);
    });

    btns.slice(1).forEach((btn) => {
      expect(btn.props().disabled).toBe(true);
    });
  });

  it('should close modal on cancel btn', async () => {
    const wrapper = mount(UpdatePasswordModal, {
      props: {
        modelValue: true,
        isLoading: false,
        'onUpdate:modelValue': (e: boolean) =>
          wrapper.setProps({ modelValue: e })
      }
    });

    const cancelButton = wrapper.find('[data-test="cancel-btn"]');

    await cancelButton.trigger('click');

    await flushPromises();

    expect(wrapper.props('modelValue')).toBe(false);
  });
});
