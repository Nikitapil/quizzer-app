import { flushPromises, mount } from '@vue/test-utils';
import ConfirmModal from '@/components/ConfirmModal.vue';
import AppButton from '@/components/AppButton.vue';

describe('ConfirmModal component tests', () => {
  const titleText = 'Test model';
  const modalSelector = '[data-test="modal"]';
  const modalTitleSelector = '[data-test="modal-title"]';
  const confirmTextSelector = '[data-test="confirm-text"]';
  const cancelButtonSelector = '[data-test="cancel-btn"]';
  const confirmButtonSelector = '[data-test="confirm-btn"]';

  const props = {
    modelValue: true,
    isLoading: false,
    title: titleText,
    'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e })
  } as const;

  const wrapper = mount(ConfirmModal, {
    props
  });

  beforeEach(async () => {
    await wrapper.setProps(props);
  });

  it('should not render confirm modal if no modelvalue is false', async () => {
    await wrapper.setProps({ modelValue: false });

    const modal = wrapper.find(modalSelector);

    expect(modal.exists()).toBe(false);
  });

  it('should render confirm modal with true modelvalue', () => {
    const modal = wrapper.find(modalSelector);

    expect(modal.exists()).toBe(true);
  });

  it('should render confirm modal with correct title', () => {
    const title = wrapper.get(modalTitleSelector);

    expect(title.text()).toBe(titleText);
  });

  it('should not render text part if text is not provided', () => {
    const text = wrapper.find(confirmTextSelector);

    expect(text.exists()).toBe(false);
  });

  it('should  render text part if text is provided', async () => {
    const textContent = 'Test model text';
    await wrapper.setProps({ text: textContent });

    const text = wrapper.get(confirmTextSelector);

    expect(text.text()).toBe(textContent);
  });

  it('should disable buttons if isLoading', async () => {
    await wrapper.setProps({ isLoading: true });

    const buttons = wrapper.findAllComponents(AppButton);

    buttons
      .slice(1)
      .forEach((button) => expect(button.props('disabled')).toBe(true));
  });

  it('should close modal on click cancel', async () => {
    await wrapper.setProps({ isLoading: false });

    const cancelBtn = wrapper.get(cancelButtonSelector);

    await cancelBtn.trigger('click');

    await flushPromises();

    const modal = wrapper.find(modalSelector);

    expect(modal.exists()).toBe(false);
  });

  it('should render confirm button with default text', async () => {
    const confirmBtn = wrapper.get(confirmButtonSelector);

    expect(confirmBtn.text()).toBe('Confirm');
  });

  it('should render confirm button with text from prop', async () => {
    const confirmBtnText = 'Test';
    await wrapper.setProps({ confirmBtnText });

    const confirmBtn = wrapper.get(confirmButtonSelector);

    expect(confirmBtn.text()).toBe(confirmBtnText);
  });

  it('should emit confirm event on click confirm btn', async () => {
    const confirmBtn = wrapper.get(confirmButtonSelector);

    await confirmBtn.trigger('click');

    expect(wrapper.emitted('confirm')).toBeTruthy();
  });
});
