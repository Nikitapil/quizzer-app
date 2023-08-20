import QuizFormQuestion from '@/modules/quizes/components/quiz-form/QuizFormQuestion.vue';
import { mount } from '@vue/test-utils';
import { i18n } from '@/main';
import QuizFormIncorrectAnswer from '@/modules/quizes/components/quiz-form/QuizFormIncorrectAnswer.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/AppButton.vue';

describe('QuizFormQuestion component tests', () => {
  it('should render component without delete button if question Number < 4', () => {
    const wrapper = mount(QuizFormQuestion, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: {
          question: 'Is it Test?',
          correctAnswer: 'yes',
          incorrectAnswers: ['no', 'maybe', 'dont know']
        },
        questionNumber: 3,
        isLoading: false
      }
    });

    const deleteBtn = wrapper.find('[data-test="delete-question"]');

    expect(deleteBtn.exists()).toBe(false);
  });

  it('should render component with delete button if question Number > 3', () => {
    const wrapper = mount(QuizFormQuestion, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: {
          question: 'Is it Test?',
          correctAnswer: 'yes',
          incorrectAnswers: ['no', 'maybe', 'dont know']
        },
        questionNumber: 4,
        isLoading: false
      }
    });

    const deleteBtn = wrapper.find('[data-test="delete-question"]');

    expect(deleteBtn.exists()).toBe(true);
  });

  it('should emit delete-question event', async () => {
    const wrapper = mount(QuizFormQuestion, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: {
          question: 'Is it Test?',
          correctAnswer: 'yes',
          incorrectAnswers: ['no', 'maybe', 'dont know']
        },
        questionNumber: 4,
        isLoading: false
      }
    });

    const deleteBtn = wrapper.get('[data-test="delete-question"]');

    await deleteBtn.trigger('click');

    expect(wrapper.emitted('delete-question')).toBeTruthy();
  });

  it('should correct amount of incorrect answers and add it while it amount < 5', async () => {
    const wrapper = mount(QuizFormQuestion, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: {
          question: 'Is it Test?',
          correctAnswer: 'yes',
          incorrectAnswers: ['no', 'maybe', 'dont know']
        },
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        questionNumber: 4,
        isLoading: false
      }
    });

    const incorrectAnswers = wrapper.findAllComponents(QuizFormIncorrectAnswer);
    const addIncorrectAnswerBtn = wrapper.get(
      '[data-test="add-incorrect-answer"]'
    );

    expect(incorrectAnswers.length).toBe(3);

    await addIncorrectAnswerBtn.trigger('click');

    const incorrectAnswers2 = wrapper.findAllComponents(
      QuizFormIncorrectAnswer
    );
    expect(incorrectAnswers2.length).toBe(4);

    await addIncorrectAnswerBtn.trigger('click');

    const incorrectAnswers3 = wrapper.findAllComponents(
      QuizFormIncorrectAnswer
    );

    expect(incorrectAnswers3.length).toBe(5);

    const addIncorrectAnswerBtn2 = wrapper.find(
      '[data-test="add-incorrect-answer"]'
    );

    expect(addIncorrectAnswerBtn2.exists()).toBe(false);
  });

  it('should disable all inputs if isLoading', () => {
    const wrapper = mount(QuizFormQuestion, {
      global: {
        plugins: [i18n]
      },
      props: {
        modelValue: {
          question: 'Is it Test?',
          correctAnswer: 'yes',
          incorrectAnswers: ['no', 'maybe', 'dont know']
        },
        questionNumber: 4,
        isLoading: true
      }
    });

    const inputs = wrapper.findAllComponents(AppInput);
    const buttons = wrapper.findAllComponents(AppButton);

    inputs.forEach((input) => {
      expect(input.props().disabled).toBe(true);
    });

    buttons.forEach((button) => {
      expect(button.props().disabled).toBe(true);
    });
  });
});
