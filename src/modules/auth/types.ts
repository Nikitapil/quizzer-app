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
}
export type TAuthStoreGetters = {};
export interface IAuthStoreActions {
  refresh: () => void;
  login: (loginRequest: IBaseAuthRequest) => void;
  register: (loginRequest: ISignUpAuthRequest) => void;
  logout: () => void;
}
