import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { PlayQuizDto } from '@/api/swagger/Quizes/data-contracts';

import { useApiMethod } from '@/api/useApiMethod';
import { quizApi } from '@/api/apiInstances';

import { i18n } from '@/plugins/i18n';

export const useGameStore = defineStore('game', () => {
  const game = ref<PlayQuizDto | null>(null);
  const currentQuestionIndex = ref(0);
  const correctAnswersCount = ref(0);
  const currentCorrectAnswer = ref<string | null>(null);

  const { call: getGameApi, isLoading: isPageLoading } = useApiMethod(
    quizApi.getPlayQuiz,
    { initialLoading: true }
  );

  const { call: getCorrectAnswerApi, isLoading: isAnswerLoading } =
    useApiMethod(quizApi.getCorrectAnswer);

  const { call: rateQuizApi, isLoading: isRateInProgress } = useApiMethod(
    quizApi.rateQuiz
  );

  const currentQuestion = computed(
    () => game.value?.questions[currentQuestionIndex.value] || null
  );

  const totalQuestionsCount = computed(() => game.value?.questions.length || 0);

  const quizName = computed(() =>
    game.value?.isGenerated ? i18n.global.t('generated_quiz') : game.value?.name
  );

  const progress = computed(
    () => (currentQuestionIndex.value / (totalQuestionsCount.value - 1)) * 100
  );

  const getGame = async (id: string) => {
    game.value = await getGameApi(id);
  };

  const getCorrectAnswer = async (id: string) => {
    const correctAnswer = await getCorrectAnswerApi(id);
    currentCorrectAnswer.value = correctAnswer?.answer || null;
  };

  const goToNextQuestion = () => {
    currentQuestionIndex.value++;
    currentCorrectAnswer.value = null;
  };

  const onAnswer = async (answer: string) => {
    if (!currentQuestion.value || currentCorrectAnswer.value) {
      return;
    }

    await getCorrectAnswer(currentQuestion.value.id);

    if (answer === currentCorrectAnswer.value) {
      correctAnswersCount.value += 1;
    }

    setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  };

  const rateQuiz = async (rating: number) => {
    if (!game.value) {
      return;
    }
    await rateQuizApi({ quizId: game.value.id, rating });
  };

  const resetGameValues = () => {
    currentQuestionIndex.value = 0;
    correctAnswersCount.value = 0;
    currentCorrectAnswer.value = null;
  };

  const init = async (id: string) => {
    resetGameValues();
    await getGame(id);
  };

  return {
    game,
    isPageLoading,
    isAnswerLoading,
    isRateInProgress,
    totalQuestionsCount,
    quizName,
    currentQuestionIndex,
    correctAnswersCount,
    currentCorrectAnswer,
    currentQuestion,
    progress,
    init,
    resetGameValues,
    rateQuiz,
    onAnswer
  };
});
