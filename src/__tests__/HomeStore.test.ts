import { vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises } from '@vue/test-utils';

import { useHomeStore } from '@/modules/home/store/HomeStore';
import { quizApi } from '@/api/apiInstances';

import {
  CategoryCountReturnDtoMock,
  GenerateQuizDtoMock,
  QuizCategoriesReturnDtoMock,
  ReturnGeneratedQuizDtoMock
} from '@/api/swagger/Quizes/mock';

import {
  mapCategoriesQuestionCounts,
  mapCategoriesToOptions
} from '@/modules/home/helpers/mappers';

import { defaultQuestionsCountValue } from '@/modules/home/domain/constants';

describe('HomeStore tests', () => {
  let store: ReturnType<typeof useHomeStore>;

  const categoriesMock = QuizCategoriesReturnDtoMock.createMany(2);
  const generateQuizResponseMock = ReturnGeneratedQuizDtoMock.create();
  const categoriesQuestionCountResponseMock =
    CategoryCountReturnDtoMock.create();

  const getCategoriesMock = vi.fn().mockResolvedValue(categoriesMock);
  const generateQuizMock = vi.fn().mockResolvedValue(generateQuizResponseMock);
  const getCategoriesQuestionCountMock = vi
    .fn()
    .mockResolvedValue(categoriesQuestionCountResponseMock);

  quizApi.getCategories = getCategoriesMock;
  quizApi.generateQuiz = generateQuizMock;
  quizApi.getCategoriesQuestionCount = getCategoriesQuestionCountMock;

  beforeEach(() => {
    getCategoriesMock.mockClear();
    generateQuizMock.mockClear();
    getCategoriesQuestionCountMock.mockClear();

    setActivePinia(createPinia());

    store = useHomeStore();
  });

  it('should set correct categories in getCategories method', async () => {
    const options = mapCategoriesToOptions(categoriesMock);

    await store.getCategories();

    await flushPromises();

    expect(store.questionCategories).toStrictEqual(options);

    expect(store.isLoading).toBe(false);
  });

  it('should set emptyCategories array by default', async () => {
    getCategoriesMock.mockResolvedValue(null);

    await store.getCategories();

    await flushPromises();

    expect(store.questionCategories).toStrictEqual([
      {
        name: 'All',
        value: ''
      }
    ]);
  });

  it('should get categoriesQuestionCount correctly', async () => {
    await store.getCategoryQuestionsCount('');

    await flushPromises();

    expect(store.categoryQuestionsCount).toStrictEqual(
      mapCategoriesQuestionCounts(categoriesQuestionCountResponseMock)
    );
  });

  it('should get categoriesQuestionCount and not set it if no response', async () => {
    getCategoriesQuestionCountMock.mockResolvedValue(null);

    await store.getCategoryQuestionsCount('');

    await flushPromises();

    expect(store.categoryQuestionsCount).toStrictEqual(
      defaultQuestionsCountValue
    );
  });

  it('should return id after generating new quiz', async () => {
    const id = await store.generateQuiz(GenerateQuizDtoMock.create());

    expect(id).toStrictEqual(generateQuizResponseMock.id);
  });
});
