import { flushPromises, mount } from '@vue/test-utils';
import ConfirmModal from '@/components/ConfirmModal.vue';
import { i18n } from '@/main';
import AppButton from '@/components/AppButton.vue';

describe('ConfirmModal component tests', () => {
  it('should not render confirm modal if nodelvalue is false', () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: false,
        isLoading: false,
        title: 'Test model'
      }
    });

    const modal = wrapper.find('[data-test="modal"]');

    expect(modal.exists()).toBe(false);
  });

  it('should render confirm modal with true modelvalue', () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model'
      }
    });

    const modal = wrapper.find('[data-test="modal"]');

    expect(modal.exists()).toBe(true);
  });

  it('should render confirm modal with correct title', () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model'
      }
    });

    const title = wrapper.get('[data-test="modal-title"]');

    expect(title.text()).toBe('Test model');
  });

  it('should not render text part if text is not provided', () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model'
      }
    });

    const text = wrapper.find('[data-test="confirm-text"]');

    expect(text.exists()).toBe(false);
  });

  it('should  render text part if text is provided', () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model',
        text: 'Test model text'
      }
    });

    const text = wrapper.get('[data-test="confirm-text"]');

    expect(text.text()).toBe('Test model text');
  });

  it('should disable buttons if isLoading', () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: true,
        title: 'Test model',
        text: 'Test model text'
      }
    });

    const buttons = wrapper.findAllComponents(AppButton);

    buttons
      .slice(1)
      .forEach((button) => expect(button.props().disabled).toBe(true));
  });

  it('should close modal on click cancel', async () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model',
        text: 'Test model text',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    });

    const cancelBtn = wrapper.get('[data-test="cancel-btn"]');

    await cancelBtn.trigger('click');

    await flushPromises();

    const modal = wrapper.find('[data-test="modal"]');

    expect(modal.exists()).toBe(false);
  });

  it('should render confirm button with default text', async () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model'
      }
    });

    const confirmBtn = wrapper.get('[data-test="confirm-btn"]');

    expect(confirmBtn.text()).toBe('Confirm');
  });

  it('should render confirm button with text from prop', async () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model',
        confirmBtnText: 'Test'
      }
    });

    const confirmBtn = wrapper.get('[data-test="confirm-btn"]');

    expect(confirmBtn.text()).toBe('Test');
  });

  it('should emit confirm event on click confirm btn', async () => {
    const wrapper = mount(ConfirmModal, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: true,
        isLoading: false,
        title: 'Test model',
        confirmBtnText: 'Test'
      }
    });

    const confirmBtn = wrapper.get('[data-test="confirm-btn"]');

    expect(confirmBtn.text()).toBe('Test');

    await confirmBtn.trigger('click');

    expect(wrapper.emitted('confirm')).toBeTruthy();
  });
});
