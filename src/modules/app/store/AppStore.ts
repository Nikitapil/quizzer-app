import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IBreadcrumb } from '@/modules/app/domain/types';

export const useAppStore = defineStore('app', () => {
  const breadcrumbs = ref<IBreadcrumb[]>([]);

  const setBreadCrumbs = (breadCrumbs: IBreadcrumb[]) => {
    breadcrumbs.value = breadCrumbs;
  };

  return {
    breadcrumbs,
    setBreadCrumbs
  };
});
