import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { PlayQuizDto } from '@/api/swagger/Quizes/data-contracts';
import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';
import { i18n } from '@/plugins/i18n';

export const useGameStore = defineStore('game', () => {
  const game = ref<PlayQuizDto | null>(null);

  const { call: getGameApi, isLoading: isPageLoading } = useApiMethod(
    quizApi.getPlayQuiz,
    { initialLoading: true }
  );

  const { call: getCorrectAnswerApi, isLoading: isAnswerLoading } =
    useApiMethod(quizApi.getCorrectAnswer);

  const { call: rateQuizApi, isLoading: isRateInProgress } = useApiMethod(
    quizApi.rateQuiz
  );

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

  const totalQuestionsCount = computed(() => game.value?.questions.length || 0);

  const quizName = computed(() =>
    game.value?.name === 'Untitled'
      ? i18n.global.t('generated_quiz')
      : game.value?.name
  );

  const getGame = async (id: string) => {
    game.value = await getGameApi(id);
  };

  const getCorrectAnswer = async (id: string) => {
    const correctAnswer = await getCorrectAnswerApi(id);

    return correctAnswer?.answer || '';
  };

  const rateQuiz = async (rating: number) => {
    if (!game.value) {
      return;
    }
    await rateQuizApi({ quizId: game.value.id, rating });
  };

  const toggleFavouriteQuiz = async () => {
    if (!game.value) {
      return;
    }

    if (!game.value.isInFavourites) {
      await addToFavorites(game.value.id);
    } else {
      await removeFromFavorites(game.value.id);
    }

    game.value.isInFavourites = !game.value.isInFavourites;
  };

  return {
    game,
    isPageLoading,
    isAnswerLoading,
    isRateInProgress,
    isToggleFavouritesInProgress,
    totalQuestionsCount,
    quizName,
    getGame,
    getCorrectAnswer,
    rateQuiz,
    toggleFavouriteQuiz
  };
});
