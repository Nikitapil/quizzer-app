import type { IOption } from '@/types/types';
import type { QuizCategoriesReturnDto } from '@/api/swagger/Quizes/data-contracts';

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
