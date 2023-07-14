import type { IOption } from '@/types/types';

export const difficultiesOptions: IOption[] = [
  {
    value: '',
    name: 'All'
  },
  {
    value: 'easy',
    name: 'Easy'
  },
  {
    value: 'medium',
    name: 'Medium'
  },
  {
    value: 'hard',
    name: 'Hard'
  }
];

export const questionTypeOptions: IOption[] = [
  {
    value: '',
    name: 'All'
  },
  {
    value: 'multiple',
    name: 'Multiple'
  },
  {
    value: 'boolean',
    name: 'True/False'
  }
];

export const defaultQuestionsCountValue = {
  easy: 50,
  medium: 50,
  hard: 50,
  all: 50
};
