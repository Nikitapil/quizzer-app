import { defineStore } from 'pinia';
import type {
  IQuizzesStoreActions,
  IQuizzesStoreState,
  TQuizzesStoreGetters,
  IGetQuizzesRequest
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
    }
  }
});
