import { mount } from '@vue/test-utils';
import AppModal from '@/components/modals/AppModal.vue';

describe('AppModal component tests', () => {
  const titleText = 'Test title';
  const modalSelector = '[data-test="modal"]';
  const wrapper = mount(AppModal, {
    props: {
      modelValue: true,
      title: titleText,
      'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
    }
  });

  it('should render modal with correct title', () => {
    const title = wrapper.get('h1');

    expect(title.text()).toBe(titleText);
  });

  it('should close modal on click outside', async () => {
    const overlay = wrapper.get('[data-test="overlay"]');

    await overlay.trigger('click');

    const modal = wrapper.find(modalSelector);
    expect(modal.exists()).toBeFalsy();
  });

  it('should close modal on click close btn', async () => {
    await wrapper.setValue(true);
    const closeBtn = wrapper.get('button');

    await closeBtn.trigger('click');

    const modal = wrapper.find(modalSelector);
    expect(modal.exists()).toBeFalsy();
  });
});
