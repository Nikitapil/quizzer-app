import { flushPromises, mount } from '@vue/test-utils';
import QuizForm from '@/modules/quizes/components/quiz-form/QuizForm.vue';
import QuizFormQuestion from '@/modules/quizes/components/quiz-form/QuizFormQuestion.vue';
import AppInput from '@/components/inputs/AppInput.vue';
import AppButton from '@/components/AppButton.vue';
import AppCheckbox from '@/components/inputs/AppCheckbox.vue';

describe('QuizForm component tests', () => {
  it('should add and remove questions', async () => {
    const wrapper = mount(QuizForm, {
      props: {
        title: 'Quiz form',
        isLoading: false
      }
    });

    const addQuestionBtn = wrapper.get('[data-test="add-question"]');

    await addQuestionBtn.trigger('click');

    const questions = wrapper.findAllComponents(QuizFormQuestion);

    expect(questions.length).toBe(4);

    const deleteBtn = wrapper.get('[data-test="delete-question"]');

    await deleteBtn.trigger('click');

    const questions2 = wrapper.findAllComponents(QuizFormQuestion);

    expect(questions2.length).toBe(3);
  });

  it('should set disabled all controls if is loading', () => {
    const wrapper = mount(QuizForm, {
      props: {
        title: 'Quiz form',
        isLoading: true
      }
    });

    const inputs = wrapper.findAllComponents(AppInput);
    const buttons = wrapper.findAllComponents(AppButton);
    const checkboxes = wrapper.findAllComponents(AppCheckbox);

    inputs.forEach((input) => {
      expect(input.props().disabled).toBe(true);
    });

    buttons.forEach((btn) => {
      expect(btn.props().disabled).toBe(true);
    });

    checkboxes.forEach((checkbox) => {
      expect(checkbox.props().disabled).toBe(true);
    });
  });

  it('should validate and emit submit if correct', async () => {
    const wrapper = mount(QuizForm, {
      props: {
        title: 'Quiz form',
        isLoading: false
      }
    });

    const form = wrapper.get('form');

    await form.trigger('submit');

    expect(wrapper.emitted('submit')).toBeFalsy();

    const inputs = wrapper.findAll('input');

    await Promise.all(inputs.map((input) => input.setValue('test value')));

    await form.trigger('submit');

    await flushPromises();

    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  it('should set initial values', async () => {
    const wrapper = mount(QuizForm, {
      props: {
        title: 'Quiz form',
        isLoading: false,
        initialValues: {
          name: 'Test quiz',
          isPrivate: false,
          questions: [
            {
              question: 'Is it Test?',
              correctAnswer: 'yes',
              incorrectAnswers: ['no', 'maybe', 'dont know']
            },
            {
              question: 'Is it Test?',
              correctAnswer: 'yes',
              incorrectAnswers: ['no', 'maybe', 'dont know']
            },
            {
              question: 'Is it Test?',
              correctAnswer: 'yes',
              incorrectAnswers: ['no', 'maybe', 'dont know']
            },
            {
              question: 'Is it Test?',
              correctAnswer: 'yes',
              incorrectAnswers: ['no', 'maybe', 'dont know']
            }
          ]
        }
      }
    });

    await flushPromises();

    const inputs = wrapper.findAllComponents(AppInput);

    expect(inputs.length).toBe(21);
  });
});
