import { vi } from 'vitest';
import { quizApi } from '@/api/apiInstances';
import { flushPromises, mount } from '@vue/test-utils';
import QuizComments from '@/modules/comments/pages/QuizComments.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useQuizCommentsPageStore } from '@/modules/comments/store/QuizCommentsPageStore';
import { PlayQuizDtoMock } from '@/api/swagger/Quizes/mock';
import { testRouter } from '../../vitest.setup';
import { ERoutesNames } from '@/router/routes-names';

describe('QuizComments', () => {
  const getPlayQuizApiMock = vi.fn();

  quizApi.getPlayQuiz = getPlayQuizApiMock;

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should get quiz on Mount and reset store on Unmount', async () => {
    const store = useQuizCommentsPageStore();
    const wrapper = mount(QuizComments);

    await flushPromises();

    expect(getPlayQuizApiMock).toHaveBeenCalledTimes(1);
    wrapper.unmount();

    expect(store.quiz).toBe(null);
  });

  it('should show empty state if no quiz', async () => {
    const wrapper = mount(QuizComments);

    await flushPromises();

    expect(wrapper.find('[data-test="quiz-not-found"]').exists()).toBe(true);
  });

  it('should show empty state if no quiz', async () => {
    getPlayQuizApiMock.mockResolvedValue(PlayQuizDtoMock.create());
    await testRouter.replace({
      name: ERoutesNames.COMMENTS,
      params: { id: 1 }
    });

    const wrapper = mount(QuizComments, {
      global: {
        stubs: {
          QuizCommentsList: true
        }
      }
    });

    await flushPromises();

    expect(wrapper.find('[data-test="comments-content"]').exists()).toBe(true);
  });
});
