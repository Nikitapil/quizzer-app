import $api from '@/api/api';
import type {
  ICategory,
  IGetCategoryQuestionsCountResponse
} from '@/modules/home/domain/types';
import type { IOption } from '@/types/types';
import { mapCategoriesToOptions } from '@/modules/home/helpers/mappers';
import type { IQuestionsCount } from '@/modules/home/domain/types';
import { defaultQuestionsCountValue } from '@/modules/home/domain/constants';

export class HomeService {
  static async getCategories(): Promise<IOption[]> {
    const { data } = await $api.get<ICategory[]>('/quizes/categories');
    return mapCategoriesToOptions(data);
  }

  static async getCategoryQuestionCount(id: string): Promise<IQuestionsCount> {
    try {
      const { data } = await $api.get<IGetCategoryQuestionsCountResponse>(
        `/quizes/categories/count/${id}`
      );

      return {
        easy: Math.min(data.total_easy_question_count, 50),
        medium: Math.min(data.total_medium_question_count, 50),
        hard: Math.min(data.total_hard_question_count, 50),
        all: Math.min(data.total_question_count, 50)
      };
    } catch (e) {
      return defaultQuestionsCountValue;
    }
  }
}
