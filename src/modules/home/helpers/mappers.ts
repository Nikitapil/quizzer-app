import type { ICategory } from '@/modules/home/domain/types';
import type { IOption } from '@/types/types';

export const mapCategoriesToOptions = (categories: ICategory[]): IOption[] => {
  return [
    { name: 'All', value: '' },
    ...categories.map((cat) => ({
      name: cat.name,
      value: cat.id
    }))
  ];
};
