export interface IBreadcrumb {
  title: string;
  routeName: string;
}

export interface IAppStoreState {
  breadCrumbs: IBreadcrumb[];
}
export type TAppStoreGetters = {};
export interface IAppStoreActions {
  setBreadCrumbs: (breadCrumbs: IBreadcrumb[]) => void;
}
