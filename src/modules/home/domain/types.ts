import type { IOption } from '@/types/types';

export interface ICategory {
  id: string;
  name: string;
}

export interface IQuestionsCount {
  easy: number;
  medium: number;
  hard: number;
  all: number;
}

export interface IHomeStoreState {
  questionCategories: IOption[];
  isCategoriesLoading: boolean;
  categoryQuestionsCount: IQuestionsCount;
}
export type THomeStoreGetters = {};
export interface IHomeStoreActions {
  getCategories: () => Promise<void>;
  getCategoryQuestionsCount: (id: string) => Promise<void>;
  generateQuiz: (
    quizParams: IGenerateQuizRequest
  ) => Promise<string | undefined>;
}

export interface IGetCategoryQuestionsCountResponse {
  total_easy_question_count: number;
  total_hard_question_count: number;
  total_medium_question_count: number;
  total_question_count: number;
}

export interface IGenerateQuizValues {
  category: string;
  difficulty: '' | 'easy' | 'medium' | 'hard';
  type: string;
  amount: number;
}

export interface IGenerateQuizRequest {
  amount: number;
  category?: number;
  difficulty?: string;
  type?: string;
}

export interface IGenerateQuizResponse {
  id: string;
}
