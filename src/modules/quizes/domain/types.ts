import type {
  EditQuizDto,
  GetAllQuizesDto,
  QuizQuestionReturnDto,
  SingleQuizReturnDto
} from '@/api/swagger/Quizes/data-contracts';

export type TQuizFormQuestion = Pick<
  QuizQuestionReturnDto,
  'question' | 'correctAnswer' | 'incorrectAnswers'
>;

export type TQuizFormValues = Pick<
  SingleQuizReturnDto,
  'name' | 'isPrivate'
> & { questions: TQuizFormQuestion[] };

export interface IGetQuizFormParams {
  quizId: string;
  userId: number;
}

export type TEditQuizParams = Omit<EditQuizDto, 'id'>;

export interface IGetUserQuizzesParams {
  userId: number;
  data: GetAllQuizesDto;
}
