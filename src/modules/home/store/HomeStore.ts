import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';
import type { GenerateQuizDto } from '@/api/swagger/Quizes/data-contracts';

import { defaultQuestionsCountValue } from '@/modules/home/domain/constants';

import {
  mapCategoriesQuestionCounts,
  mapCategoriesToOptions
} from '@/modules/home/helpers/mappers';

import type { IOption } from '@/types/types';

export const useHomeStore = defineStore('home', () => {
  const questionCategories = ref<IOption[]>([]);
  const categoryQuestionsCount = ref(defaultQuestionsCountValue);

  const { call: getCategoriesApi, isLoading: isCategoriesLoading } =
    useApiMethod(quizApi.getCategories);

  const {
    call: getCategoriesQuestionCountApi,
    isLoading: isCategoriesQuestionCountLoading
  } = useApiMethod(quizApi.getCategoriesQuestionCount);

  const { call: generateQuizApi, isLoading: isGenerateQuizInProgress } =
    useApiMethod(quizApi.generateQuiz);

  const isLoading = computed(
    () =>
      isCategoriesLoading.value ||
      isCategoriesQuestionCountLoading.value ||
      isGenerateQuizInProgress.value
  );

  const getCategories = async () => {
    const response = await getCategoriesApi();
    questionCategories.value = mapCategoriesToOptions(response || []);
  };

  const getCategoryQuestionsCount = async (id: string) => {
    const response = await getCategoriesQuestionCountApi(id);

    if (response) {
      categoryQuestionsCount.value = mapCategoriesQuestionCounts(response);
    }
  };

  const generateQuiz = async (params: GenerateQuizDto) => {
    const response = await generateQuizApi(params);

    return response?.id;
  };

  return {
    questionCategories,
    categoryQuestionsCount,
    isLoading,
    getCategories,
    getCategoryQuestionsCount,
    generateQuiz
  };
});
