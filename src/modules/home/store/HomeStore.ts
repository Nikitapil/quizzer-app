import { defineStore } from 'pinia';
import type {
  IHomeStoreActions,
  IHomeStoreState,
  THomeStoreGetters
} from '@/modules/home/domain/types';
import { toast } from 'vue3-toastify';
import { HomeService } from '@/modules/home/HomeService';
import { defaultQuestionsCountValue } from '@/modules/home/domain/constants';

export const useHomeStore = defineStore<
  'home',
  IHomeStoreState,
  THomeStoreGetters,
  IHomeStoreActions
>('home', {
  state: () => {
    return {
      questionCategories: [],
      isCategoriesLoading: false,
      categoryQuestionsCount: defaultQuestionsCountValue
    };
  },
  getters: {},
  actions: {
    async getCategories() {
      try {
        this.isCategoriesLoading = true;
        this.questionCategories = await HomeService.getCategories();
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
      } finally {
        this.isCategoriesLoading = false;
      }
    },
    async getCategoryQuestionsCount(id: string) {
      if (!id) {
        this.categoryQuestionsCount = defaultQuestionsCountValue;
      }
      try {
        this.categoryQuestionsCount =
          await HomeService.getCategoryQuestionCount(id);
      } catch (e: any) {
        if (e?.response?.data?.message) {
          toast(e?.response.data.message);
        }
      }
    }
  }
});
