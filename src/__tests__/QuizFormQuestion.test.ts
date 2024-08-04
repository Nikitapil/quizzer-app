import QuizFormQuestion from '@/modules/quizes/components/quiz-form/QuizFormQuestion.vue';
import { flushPromises, mount } from '@vue/test-utils';
import QuizFormIncorrectAnswer from '@/modules/quizes/components/quiz-form/QuizFormIncorrectAnswer.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import { CreateQuizQuestionDtoMock } from '@/api/swagger/Quizes/mock';

describe('QuizFormQuestion component tests', () => {
  const deleteBtnSelector = '[data-test="delete-question"]';
  const addIncorrectAnswerBtnSelector = '[data-test="add-incorrect-answer"]';

  const question = CreateQuizQuestionDtoMock.create({
    incorrectAnswers: ['123', '123', '123', '123']
  });

  const props = {
    modelValue: question,
    questionNumber: 3,
    isLoading: false
  };

  const wrapper = mount(QuizFormQuestion, {
    props
  });

  beforeEach(async () => {
    await wrapper.setProps(props);
  });

  it('should render component without delete button if question Number < 4', () => {
    const deleteBtn = wrapper.find(deleteBtnSelector);

    expect(deleteBtn.exists()).toBe(false);
  });

  it('should render component with delete button if question Number > 3', async () => {
    await wrapper.setProps({ questionNumber: 4 });

    const deleteBtn = wrapper.find(deleteBtnSelector);

    await deleteBtn.trigger('click');

    expect(deleteBtn.exists()).toBe(true);
    expect(wrapper.emitted('delete-question')).toBeTruthy();
  });

  it('should correct amount of incorrect answers and add it while it amount < 5', async () => {
    const incorrectAnswers = wrapper.findAllComponents(QuizFormIncorrectAnswer);
    const addIncorrectAnswerBtn = wrapper.get(addIncorrectAnswerBtnSelector);

    expect(incorrectAnswers.length).toBe(4);

    await addIncorrectAnswerBtn.trigger('click');

    const incorrectAnswers2 = wrapper.findAllComponents(
      QuizFormIncorrectAnswer
    );
    expect(incorrectAnswers2.length).toBe(5);

    const addIncorrectAnswerBtn2 = wrapper.find(addIncorrectAnswerBtnSelector);

    expect(addIncorrectAnswerBtn2.exists()).toBe(false);
  });

  it('should disable all inputs if isLoading', async () => {
    await wrapper.setProps({ isLoading: true });

    const inputs = wrapper.findAllComponents(AppInput);
    const buttons = wrapper.findAllComponents(AppButton);

    inputs.forEach((input) => {
      expect(input.props().disabled).toBe(true);
    });

    buttons.forEach((button) => {
      expect(button.props().disabled).toBe(true);
    });
  });

  it('should delete incorrect answer', async () => {
    const incorrectAnswers = wrapper.findAllComponents(QuizFormIncorrectAnswer);

    expect(incorrectAnswers.length).toBe(5);

    incorrectAnswers.at(-1)?.vm.$emit('delete-answer');

    await flushPromises();
    expect(wrapper.findAllComponents(QuizFormIncorrectAnswer).length).toBe(4);
  });
});
