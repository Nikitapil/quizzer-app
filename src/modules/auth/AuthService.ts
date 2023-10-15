import $api from '@/api/api';
import type { AxiosResponse } from 'axios';
import type {
  IAuthResponse,
  IBaseAuthRequest,
  ISignUpAuthRequest,
  IUser,
  TEditUserRequest
} from '@/modules/auth/domain/types';

export class AuthService {
  static async signUp(
    userData: ISignUpAuthRequest
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/signup', userData);
  }

  static async signIn(
    userData: IBaseAuthRequest
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/auth/signin', userData);
  }

  static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>('/auth/refresh');
  }

  static async logout(): Promise<void> {
    return $api.get('/auth/logout');
  }

  static async getRestoreKey(email: string): Promise<void> {
    return $api.post('/auth/get_restore_password_key', { email });
  }

  static async restorePassword(
    key: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.put<IAuthResponse>('/auth/restore_password', { key, password });
  }

  static async editUser(
    editUserRequest: TEditUserRequest
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/users/edit', editUserRequest);
  }

  static async deleteUser(userId: number) {
    return $api.delete(`/users/delete/${userId}`);
  }
}
