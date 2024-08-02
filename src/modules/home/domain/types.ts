import {
  QuizDifficultiesEnum,
  QuizQuestionTypeEnum
} from '@/api/swagger/Quizes/data-contracts';
import { defaultQuestionsCountValue } from '@/modules/home/domain/constants';

export type QuestionCountKeys = keyof typeof defaultQuestionsCountValue;

export interface IGenerateQuizValues {
  category: string;
  difficulty: '' | QuizDifficultiesEnum;
  type: '' | QuizQuestionTypeEnum;
  amount: number;
}
