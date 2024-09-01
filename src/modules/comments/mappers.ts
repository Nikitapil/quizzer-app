import type { QuizCommentReturnDto } from '@/api/swagger/Quizes/data-contracts';
import type { IQuizComment } from '@/modules/comments/domain';

export const extendQuizCommentWithClientData = (
  quizComment: QuizCommentReturnDto
): IQuizComment => {
  return {
    ...quizComment,
    isEditInProgress: false
  };
};
