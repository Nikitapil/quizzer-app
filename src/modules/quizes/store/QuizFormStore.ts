import { defineStore } from 'pinia';
import type {
  IQuizFormStoreActions,
  IQuizFormStoreState,
  IQuizFormValues,
  TQuizFormStoreGetters
} from '@/modules/quizes/domain/types';
import { toast } from 'vue3-toastify';
import { QuizzesService } from '@/modules/quizes/QuizzesService';

export const useQuizFormStore = defineStore<
  'quiz-form',
  IQuizFormStoreState,
  TQuizFormStoreGetters,
  IQuizFormStoreActions
>('quiz-form', {
  state: () => {
    return {
      isLoading: false,
      quizForm: null
    };
  },

  actions: {
    async createQuiz(data: IQuizFormValues) {
      try {
        this.isLoading = true;
        await QuizzesService.createQuiz(data);
        return true;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
        return false;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
