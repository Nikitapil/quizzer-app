import 'vue-router';
import type { IBreadcrumb } from '@/modules/app/domain/types';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs: IBreadcrumb[];
  }
}
