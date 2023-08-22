import { mount } from '@vue/test-utils';
import QuizzesList from '@/modules/quizes/components/QuizzesList.vue';
import { i18n } from '@/main';
import { createTestingPinia } from '@pinia/testing';

describe('QuizzesList component tests', () => {
  it('should emit get-quizzes event on mount', () => {
    const wrapper = mount(QuizzesList, {
      global: {
        plugins: [i18n, createTestingPinia()]
      },
      props: {
        title: 'Test list'
      }
    });

    expect(wrapper.emitted('get-quizzes')).toBeTruthy();
    expect(wrapper.emitted('get-quizzes')[0]).toEqual([
      {
        page: 1,
        search: ''
      }
    ]);
  });
});
