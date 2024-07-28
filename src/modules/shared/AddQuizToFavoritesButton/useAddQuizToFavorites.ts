import { computed, type Ref } from 'vue';
import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';
import type { IQuizWithInFavoritesFlag } from '@/modules/shared/AddQuizToFavoritesButton/domain';

export const useAddQuizToFavorites = (
  quizWithInFavoritesFlag: Ref<IQuizWithInFavoritesFlag>
) => {
  const { call: addToFavorites, isLoading: isAddToFavoritesInProgress } =
    useApiMethod(quizApi.addQuizToFavourites);

  const {
    call: removeFromFavorites,
    isLoading: isRemoveFromFavoritesInProgress
  } = useApiMethod(quizApi.removeQuizFromFavourites);

  const isToggleFavouritesInProgress = computed(
    () =>
      isAddToFavoritesInProgress.value || isRemoveFromFavoritesInProgress.value
  );

  const toggleFavorites = async () => {
    if (quizWithInFavoritesFlag.value.isInFavourites) {
      await removeFromFavorites(quizWithInFavoritesFlag.value.id);
    } else {
      await addToFavorites(quizWithInFavoritesFlag.value.id);
    }

    quizWithInFavoritesFlag.value.isInFavourites =
      !quizWithInFavoritesFlag.value.isInFavourites;
  };

  return {
    isToggleFavouritesInProgress,
    toggleFavorites
  };
};
