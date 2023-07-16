import { defineStore } from 'pinia';
import type {
  IAppStoreActions,
  IAppStoreState,
  IBreadcrumb,
  TAppStoreGetters
} from '@/modules/app/domain/types';

export const useAppStore = defineStore<
  'app',
  IAppStoreState,
  TAppStoreGetters,
  IAppStoreActions
>('app', {
  state: () => {
    return {
      breadCrumbs: []
    };
  },
  getters: {},
  actions: {
    setBreadCrumbs(breadcrumbs: IBreadcrumb[]) {
      this.breadCrumbs = breadcrumbs;
    }
  }
});
