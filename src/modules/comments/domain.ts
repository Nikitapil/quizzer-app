import type { QuizCommentReturnDto } from '@/api/swagger/Quizes/data-contracts';

export interface IQuizComment extends QuizCommentReturnDto {
  isEditInProgress: boolean;
}
