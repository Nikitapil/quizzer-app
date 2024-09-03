import { QuizCommentReturnDtoMock } from '@/api/swagger/Quizes/mock';
import type { IQuizComment } from '@/modules/comments/domain';
import { mount } from '@vue/test-utils';
import QuizComment from '@/modules/comments/components/QuizComment.vue';

describe('QuizComment', () => {
  const comment: IQuizComment = {
    ...QuizCommentReturnDtoMock.create({
      updatedAt: new Date('09.03.2024').toISOString()
    }),
    isEditInProgress: false
  };

  it('renders correctly', () => {
    const wrapper = mount(QuizComment, {
      props: {
        comment
      }
    });

    const dateEl = wrapper.find('[data-testid="comment-date"]');

    expect(dateEl.text()).toBe('9/3/2024');
  });
});
