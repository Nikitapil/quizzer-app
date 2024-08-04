import type { CreateQuizQuestionDto } from '@/api/swagger/Quizes/data-contracts';

export class QuizFormQuestionDto implements CreateQuizQuestionDto {
  question = '';
  correctAnswer = '';
  incorrectAnswers = [''];
}
