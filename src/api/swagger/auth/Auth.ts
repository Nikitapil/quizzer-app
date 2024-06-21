/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type {
  AuthResponseDto,
  CreateUserDto,
  GetRestoreKeyDto,
  LoginUserDto,
  RestorePasswordDto,
  SuccessMessageDto
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class AuthApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authorization
   * @name Signup
   * @summary Sign up
   * @request POST:/api/auth/signup
   */
  signup = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/signup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Authorization
   * @name Signin
   * @summary Sign in
   * @request POST:/api/auth/signin
   */
  signin = (data: LoginUserDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/signin`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Authorization
   * @name Refresh
   * @summary Refresh tokens
   * @request GET:/api/auth/refresh
   */
  refresh = (params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/refresh`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Authorization
   * @name Logout
   * @summary Logout
   * @request GET:/api/auth/logout
   */
  logout = (params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/auth/logout`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Authorization
   * @name GetRestorePasswordKey
   * @summary Get restore password key to email
   * @request POST:/api/auth/get_restore_password_key
   */
  getRestorePasswordKey = (data: GetRestoreKeyDto, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/auth/get_restore_password_key`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Authorization
   * @name RestorePassword
   * @summary Restore password
   * @request PUT:/api/auth/restore_password
   */
  restorePassword = (data: RestorePasswordDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/restore_password`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
}
