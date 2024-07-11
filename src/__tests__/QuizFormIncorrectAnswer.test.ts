import { mount } from '@vue/test-utils';
import QuizFormIncorrectAnswer from '@/modules/quizes/components/quiz-form/QuizFormIncorrectAnswer.vue';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/inputs/AppInput.vue';

describe('QuizFormIncorrectAnswer component tests', () => {
  it('should render answer without delete btn if 0 index', () => {
    const wrapper = mount(QuizFormIncorrectAnswer, {
      props: {
        index: 0,
        questionId: '123',
        isLoading: false
      }
    });

    const deleteBtn = wrapper.find('button');

    expect(deleteBtn.exists()).toBe(false);
  });

  it('should render answer with delete btn if index more than 0', () => {
    const wrapper = mount(QuizFormIncorrectAnswer, {
      props: {
        index: 1,
        questionId: '123',
        isLoading: false
      }
    });

    const deleteBtn = wrapper.find('button');

    expect(deleteBtn.exists()).toBe(true);
  });

  it('should disable input and btn if isLoading', () => {
    const wrapper = mount(QuizFormIncorrectAnswer, {
      props: {
        index: 1,
        questionId: '123',
        isLoading: true
      }
    });

    const deleteBtn = wrapper.getComponent(AppInput);
    const input = wrapper.getComponent(AppButton);

    expect(deleteBtn.props().disabled).toBe(true);
    expect(input.props().disabled).toBe(true);
  });

  it('should emit delete-answer event', async () => {
    const wrapper = mount(QuizFormIncorrectAnswer, {
      props: {
        index: 1,
        questionId: '123',
        isLoading: false
      }
    });

    const deleteBtn = wrapper.getComponent(AppButton);

    await deleteBtn.trigger('click');

    expect(wrapper.emitted('delete-answer')).toBeTruthy();
  });
});
