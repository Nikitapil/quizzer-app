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
  refresh: () => void;
  login: (loginRequest: IBaseAuthRequest) => void;
  register: (loginRequest: ISignUpAuthRequest) => void;
  logout: () => void;
  getRestorePasswordKey: (email: string) => void;
  setAuthData: (data: IAuthResponse) => void;
  restorePassword: (request: IRestorePasswordRequest) => void;
}
