import { mount } from '@vue/test-utils';
import GameQuestion from '@/modules/game/components/GameQuestion.vue';
import { PlayQuestionDtoMock } from '@/api/swagger/Quizes/mock';

describe('GameQuestion component tests', () => {
  const question = PlayQuestionDtoMock.create();
  const wrapper = mount(GameQuestion, {
    props: {
      question,
      correctAnswer: null,
      isLoading: false,
      isGenerated: false
    }
  });

  it('should render GameQuestion component with correct props', () => {
    const title = wrapper.get('h3');
    const btns = wrapper.findAll('button');

    expect(title.text()).toBe(question.question);
    expect(btns.length).toBe(question.answers.length);
  });

  it('should highlight correct answer', async () => {
    await wrapper.setProps({
      correctAnswer: question.answers[0]
    });

    const btns = wrapper.findAll('button');

    expect(btns[0].classes()).toContain('success');
  });

  it('should emit answer event', async () => {
    const btns = wrapper.findAll('button');

    await btns[0].trigger('click');

    expect(wrapper.emitted('answer')).toBeTruthy();
    expect(wrapper.emitted('answer')?.[0]).toEqual([question.answers[0]]);
  });
});
