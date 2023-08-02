import { defineStore } from 'pinia';
import type {
  IGetQuizFormParams,
  IQuizFormStoreActions,
  IQuizFormStoreState,
  IQuizFormValues,
  TQuizFormStoreGetters
} from '@/modules/quizes/domain/types';
import { toast } from 'vue3-toastify';
import { QuizzesService } from '@/modules/quizes/QuizzesService';
import { mapQuizResponseToQuizForm } from '@/modules/quizes/helpers/mapers';

export const useQuizFormStore = defineStore<
  'quiz-form',
  IQuizFormStoreState,
  TQuizFormStoreGetters,
  IQuizFormStoreActions
>('quiz-form', {
  state: () => {
    return {
      isLoading: false,
      quizForm: null,
      isQuizLoading: false,
      quizId: ''
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
    },
    async editQuiz(data: IQuizFormValues) {
      try {
        this.isLoading = true;
        await QuizzesService.editQuiz({ ...data, id: this.quizId });
        return true;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async getQuizForm({ quizId, userId }: IGetQuizFormParams) {
      try {
        this.isQuizLoading = true;
        const { data } = await QuizzesService.getSingleQuiz(quizId);
        if (data.userId !== userId) {
          this.quizForm = null;
          return;
        }
        this.quizForm = mapQuizResponseToQuizForm(data);
        this.quizId = quizId;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
      } finally {
        this.isQuizLoading = false;
      }
    }
  }
});
