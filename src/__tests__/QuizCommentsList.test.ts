import { vi } from 'vitest';
import { quizCommentsApi } from '@/api/apiInstances';
import { ManyCommentsReturnDtoMock } from '@/api/swagger/Quizes/mock';
import { flushPromises, mount } from '@vue/test-utils';
import QuizCommentsList from '@/modules/comments/components/QuizCommentsList.vue';
import QuizComment from '@/modules/comments/components/QuizComment.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('QuizCommentsList test', () => {
  const getQuizCommentsApiMock = vi.fn();

  quizCommentsApi.getQuizComments = getQuizCommentsApiMock;

  beforeEach(() => {
    setActivePinia(createPinia());
    getQuizCommentsApiMock.mockClear();
  });

  it('should add isEditInProgress field to quiz comments', async () => {
    getQuizCommentsApiMock.mockResolvedValue(
      ManyCommentsReturnDtoMock.create({
        totalCount: 2
      })
    );

    const wrapper = mount(QuizCommentsList, {
      props: {
        quizId: '123'
      }
    });

    await flushPromises();

    const comments = wrapper.findAllComponents(QuizComment);

    comments.forEach((comment) => {
      expect(comment.props('comment').isEditInProgress).toBe(false);
    });
  });
});
