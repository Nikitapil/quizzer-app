import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { PlayQuizDto } from '@/api/swagger/Quizes/data-contracts';

import { useApiMethod } from '@/api/useApiMethod';

import { quizApi } from '@/api/apiInstances';

export const useQuizCommentsPageStore = defineStore(
  'QuizCommentsPageStore',
  () => {
    const quiz = ref<PlayQuizDto | null>(null);

    const { call: getQuiz, isLoading: isQuizLoading } = useApiMethod(
      quizApi.getPlayQuiz
    );

    const init = async (quizId: string) => {
      quiz.value = await getQuiz(quizId);
    };

    const reset = () => {
      quiz.value = null;
    };

    return {
      quiz,
      isQuizLoading,
      init,
      reset
    };
  }
);
