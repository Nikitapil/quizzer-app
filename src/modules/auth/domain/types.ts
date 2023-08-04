export interface IUser {
  id: number;
  username: string;
  email: string;
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

export type TAuthStoreGetters = {};
export interface IAuthStoreActions {
  refresh: () => Promise<void>;
  login: (loginRequest: IBaseAuthRequest) => Promise<void>;
  register: (loginRequest: ISignUpAuthRequest) => Promise<void>;
  logout: () => Promise<void>;
  getRestorePasswordKey: (email: string) => Promise<boolean>;
  setAuthData: (data: IAuthResponse) => Promise<void>;
  restorePassword: (request: IRestorePasswordRequest) => Promise<void>;
}
