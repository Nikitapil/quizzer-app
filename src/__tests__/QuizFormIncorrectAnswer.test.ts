import { mount } from '@vue/test-utils';
import QuizFormIncorrectAnswer from '@/modules/quizes/components/quiz-form/QuizFormIncorrectAnswer.vue';
import AppButton from '@/components/buttons/AppButton.vue';
import AppInput from '@/components/inputs/AppInput.vue';

describe('QuizFormIncorrectAnswer component tests', () => {
  const props = {
    index: 1,
    questionId: '123',
    isLoading: false
  } as const;

  const wrapper = mount(QuizFormIncorrectAnswer, {
    props
  });

  beforeEach(async () => {
    await wrapper.setProps(props);
  });

  it('should render answer without delete btn if 0 index', async () => {
    await wrapper.setProps({ index: 0 });

    const deleteBtn = wrapper.find('button');

    expect(deleteBtn.exists()).toBe(false);
  });

  it('should render answer with delete btn if index more than 0', () => {
    const deleteBtn = wrapper.find('button');

    expect(deleteBtn.exists()).toBe(true);
  });

  it('should disable input and btn if isLoading', async () => {
    await wrapper.setProps({ isLoading: true });

    const deleteBtn = wrapper.getComponent(AppInput);
    const input = wrapper.getComponent(AppButton);

    expect(deleteBtn.props().disabled).toBe(true);
    expect(input.props().disabled).toBe(true);
  });

  it('should emit delete-answer event', async () => {
    const deleteBtn = wrapper.getComponent(AppButton);

    await deleteBtn.trigger('click');

    expect(wrapper.emitted('delete-answer')).toBeTruthy();
  });
});
