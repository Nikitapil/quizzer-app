import { mount } from '@vue/test-utils';
import GameQuestion from '@/modules/game/components/GameQuestion.vue';

describe('GameQuestion component tests', () => {
  it('should render GameQuestion component with correct props', () => {
    const wrapper = mount(GameQuestion, {
      props: {
        question: {
          id: '1',
          question: 'Is it Test?',
          answers: ['yes', 'no', "don't know", 'what']
        },
        correctAnswer: null,
        isLoading: false
      }
    });

    const title = wrapper.get('h3');
    const btns = wrapper.findAll('button');

    expect(title.text()).toBe('Is it Test?');
    expect(btns.length).toBe(4);
  });

  it('should highlight correct answer', () => {
    const wrapper = mount(GameQuestion, {
      props: {
        question: {
          id: '1',
          question: 'Is it Test?',
          answers: ['yes', 'no', "don't know", 'what']
        },
        correctAnswer: 'yes',
        isLoading: false
      }
    });

    const btns = wrapper.findAll('button');

    expect(btns[0].classes()).toContain('success');
  });

  it('should emit answer event', async () => {
    const wrapper = mount(GameQuestion, {
      props: {
        question: {
          id: '1',
          question: 'Is it Test?',
          answers: ['yes', 'no', "don't know", 'what']
        },
        correctAnswer: 'yes',
        isLoading: false
      }
    });

    const btns = wrapper.findAll('button');

    await btns[0].trigger('click');

    expect(wrapper.emitted('answer')).toBeTruthy();
    expect(wrapper.emitted('answer')?.[0]).toEqual(['yes']);
  });
});
