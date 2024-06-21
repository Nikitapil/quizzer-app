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

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authorization
   * @name AuthControllerSignup
   * @summary Sign up
   * @request POST:/api/auth/signup
   */
  authControllerSignup = (data: CreateUserDto, params: RequestParams = {}) =>
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
   * @name AuthControllerSignin
   * @summary Sign in
   * @request POST:/api/auth/signin
   */
  authControllerSignin = (data: LoginUserDto, params: RequestParams = {}) =>
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
   * @name AuthControllerRefresh
   * @summary Refresh tokens
   * @request GET:/api/auth/refresh
   */
  authControllerRefresh = (params: RequestParams = {}) =>
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
   * @name AuthControllerLogout
   * @summary Logout
   * @request GET:/api/auth/logout
   */
  authControllerLogout = (params: RequestParams = {}) =>
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
   * @name AuthControllerGetRestorePasswordKey
   * @summary Get restore password key to email
   * @request POST:/api/auth/get_restore_password_key
   */
  authControllerGetRestorePasswordKey = (data: GetRestoreKeyDto, params: RequestParams = {}) =>
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
   * @name AuthControllerRestorePassword
   * @summary Restore password
   * @request PUT:/api/auth/restore_password
   */
  authControllerRestorePassword = (data: RestorePasswordDto, params: RequestParams = {}) =>
    this.request<AuthResponseDto, any>({
      path: `/api/auth/restore_password`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
}
