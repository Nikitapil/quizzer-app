export interface IBaseAuthRequest {
  email: string;
  password: string;
}

export interface ISignUpAuthRequest extends IBaseAuthRequest {
  username: string;
}

export interface IRestorePasswordRequest {
  key: string;
  password: string;
}
