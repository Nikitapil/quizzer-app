import { ERoutesNames } from '@/router/routes-names';

export interface IBreadcrumb {
  title: string;
  routeName: ERoutesNames;
}

export interface IAppStoreState {
  breadCrumbs: IBreadcrumb[];
}
export type TAppStoreGetters = {};
export interface IAppStoreActions {
  setBreadCrumbs: (breadCrumbs: IBreadcrumb[]) => void;
}
