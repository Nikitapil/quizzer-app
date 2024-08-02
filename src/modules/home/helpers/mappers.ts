import type { IOption } from '@/types/types';
import type {
  CategoryCountReturnDto,
  QuizCategoriesReturnDto
} from '@/api/swagger/Quizes/data-contracts';

export const mapCategoriesToOptions = (
  categories: QuizCategoriesReturnDto[]
): IOption[] => {
  return [
    { name: 'All', value: '' },
    ...categories.map((cat) => ({
      name: cat.name,
      value: cat.id.toString()
    }))
  ];
};

export const getCategoryLevelQuestionCount = (
  countFromApi: number,
  maxCount = 50
) => {
  return Math.min(countFromApi, maxCount);
};

export const mapCategoriesQuestionCounts = (data: CategoryCountReturnDto) => ({
  easy: getCategoryLevelQuestionCount(data.total_easy_question_count),
  medium: getCategoryLevelQuestionCount(data.total_medium_question_count),
  hard: getCategoryLevelQuestionCount(data.total_hard_question_count),
  all: data.total_question_count
});
