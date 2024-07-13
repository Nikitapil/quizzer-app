import { onMounted } from 'vue';
import { useAppStore } from '@/modules/app/store/AppStore';
import type { IBreadcrumb } from '@/modules/app/domain/types';

export const useBreadCrumbs = (breadCrumbs: IBreadcrumb[]) => {
  const store = useAppStore();

  onMounted(() => {
    store.setBreadCrumbs(breadCrumbs);
  });
};
