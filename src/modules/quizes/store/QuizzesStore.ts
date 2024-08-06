import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';
import type {
  AllQuizesReturnDto,
  GetAllQuizesDto,
  QuizDto
} from '@/api/swagger/Quizes/data-contracts';
import type { IGetUserQuizzesParams } from '@/modules/quizes/domain/types';

export const useQuizzesStore = defineStore('quizzesStore', () => {
  const quizzes = ref<QuizDto[]>([]);
  const totalCount = ref(0);

  const { call: getAllQuizzesApi, isLoading: isGetAllQuizzesLoading } =
    useApiMethod(quizApi.getAllQuizes);

  const { call: getUserQuizzesApi, isLoading: isGetQuizzesByUserLoading } =
    useApiMethod(quizApi.getQuizesByUser);

  const {
    call: getFavoritesQuizzesApi,
    isLoading: isGetFavoritesQuizzesLoading
  } = useApiMethod(quizApi.getFavouritesQuizes);

  const { call: deleteQuizApi, isLoading: isDeleteInProgress } = useApiMethod(
    quizApi.deleteQuiz
  );

  const isQuizzesLoading = computed(
    () =>
      isGetAllQuizzesLoading.value ||
      isGetQuizzesByUserLoading.value ||
      isGetFavoritesQuizzesLoading.value
  );

  const getQuizesMethod = async (
    method: () => Promise<AllQuizesReturnDto | null>
  ) => {
    const response = await method();
    if (response) {
      quizzes.value = response.quizes;
      totalCount.value = response.totalCount;
    }
  };

  const getAllQuizes = async (data: GetAllQuizesDto) => {
    await getQuizesMethod(async () => getAllQuizzesApi(data));
  };

  const getUserQuizzes = async ({ data, userId }: IGetUserQuizzesParams) => {
    await getQuizesMethod(async () => getUserQuizzesApi(userId, data));
  };

  const getFavouritesQuizzes = async (data: GetAllQuizesDto) => {
    await getQuizesMethod(async () => getFavoritesQuizzesApi(data));
  };

  const deleteQuiz = async (id: string) => {
    const response = await deleteQuizApi(id);
    return !!response;
  };

  return {
    quizzes,
    totalCount,
    isQuizzesLoading,
    isDeleteInProgress,
    getAllQuizes,
    getUserQuizzes,
    getFavouritesQuizzes,
    deleteQuiz
  };
});
