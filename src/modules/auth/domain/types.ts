export interface IUser {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'User';
}
export interface IBaseAuthRequest {
  email: string;
  password: string;
}

export interface ISignUpAuthRequest extends IBaseAuthRequest {
  username: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface IAuthStoreState {
  user: IUser | null;
  isLoading: boolean;
  isRestorePasswordLoading: boolean;
}

export interface IRestorePasswordRequest {
  key: string;
  password: string;
}

export type TAuthStoreGetters = {
  isAdmin(state: IAuthStoreState): boolean;
};
export interface IAuthStoreActions {
  refresh: () => Promise<void>;
  login: (loginRequest: IBaseAuthRequest) => Promise<void>;
  register: (loginRequest: ISignUpAuthRequest) => Promise<void>;
  logout: () => Promise<void>;
  getRestorePasswordKey: (email: string) => Promise<boolean>;
  setAuthData: (data: IAuthResponse) => void;
  restorePassword: (request: IRestorePasswordRequest) => Promise<void>;
  updateUser: (user: IUser) => void;
  deleteUser: () => Promise<boolean>;
}

export type TEditUserRequest = Partial<ISignUpAuthRequest>;
