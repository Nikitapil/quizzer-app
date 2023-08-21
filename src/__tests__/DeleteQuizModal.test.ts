import { mount } from '@vue/test-utils';
import DeleteQuizModal from '@/modules/quizes/components/DeleteQuizModal.vue';
import { i18n } from '@/main';
import AppButton from '@/components/AppButton.vue';

describe('DeleteQuizModal component tests', () => {
  it('should emit delete event on confirm click', async () => {
    const wrapper = mount(DeleteQuizModal, {
      props: {
        isLoading: false,
        modelValue: true
      },
      global: {
        plugins: [i18n]
      }
    });

    const deleteBtn = wrapper.get('[data-test="delete-btn"]');

    await deleteBtn.trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  it('should disable buttons in model if loading', async () => {
    const wrapper = mount(DeleteQuizModal, {
      props: {
        isLoading: true,
        modelValue: true
      },
      global: {
        plugins: [i18n]
      }
    });

    const btns = wrapper.findAllComponents(AppButton);

    btns.slice(1).forEach((btn) => {
      expect(btn.props().disabled).toBe(true);
    });
  });
});
