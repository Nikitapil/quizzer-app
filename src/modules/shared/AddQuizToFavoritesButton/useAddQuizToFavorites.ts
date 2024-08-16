import { type Ref } from 'vue';

import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';

import type { IQuizWithInFavoritesFlag } from '@/modules/shared/AddQuizToFavoritesButton/domain';

export const useAddQuizToFavorites = (
  quizWithInFavoritesFlag: Ref<IQuizWithInFavoritesFlag>
) => {
  const { call: toggleFavoritesApi, isLoading: isToggleFavouritesInProgress } =
    useApiMethod(quizApi.toggleQuizInFavourites);

  const toggleFavorites = async () => {
    await toggleFavoritesApi(quizWithInFavoritesFlag.value.id);

    quizWithInFavoritesFlag.value.isInFavourites =
      !quizWithInFavoritesFlag.value.isInFavourites;
  };

  return {
    isToggleFavouritesInProgress,
    toggleFavorites
  };
};
