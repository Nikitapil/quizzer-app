import { defineStore } from 'pinia';
import type {
  IQuizzesStoreActions,
  IQuizzesStoreState,
  TQuizzesStoreGetters,
  IGetQuizzesRequest,
  IQuiz
} from '@/modules/quizes/domain/types';
import { toast } from 'vue3-toastify';
import { QuizzesService } from '@/modules/quizes/QuizzesService';

export const useQuizzesStore = defineStore<
  'all-quizzes',
  IQuizzesStoreState,
  TQuizzesStoreGetters,
  IQuizzesStoreActions
>('all-quizzes', {
  state: () => {
    return {
      quizzes: [],
      isQuizzesLoading: false,
      isDeleteInProgress: false,
      isToggleFavouritesInProgress: false,
      totalCount: 0
    };
  },
  getters: {},
  actions: {
    async getAllQuizes(request: IGetQuizzesRequest) {
      try {
        this.isQuizzesLoading = true;
        const { data } = await QuizzesService.getAllQuizzes(request);
        this.quizzes = data.quizes;
        this.totalCount = data.totalCount;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
      } finally {
        this.isQuizzesLoading = false;
      }
    },
    async deleteQuiz(id: string) {
      try {
        this.isDeleteInProgress = true;
        await QuizzesService.deleteQuiz(id);
        return true;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
        return false;
      } finally {
        this.isDeleteInProgress = false;
      }
    },
    async toggleFavouriteQuiz(quiz: IQuiz) {
      try {
        this.isToggleFavouritesInProgress = true;
        if (!quiz.isInFavourites) {
          await QuizzesService.addQuizToFavourites(quiz.id);
        } else {
          await QuizzesService.removeQuizToFavourites(quiz.id);
        }
        const idx = this.quizzes.findIndex((q) => q.id === quiz.id);
        if (idx !== -1) {
          this.quizzes[idx].isInFavourites = !this.quizzes[idx].isInFavourites;
        }
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
      } finally {
        this.isToggleFavouritesInProgress = false;
      }
    }
  }
});
