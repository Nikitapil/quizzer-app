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

import type { EditUserDto, SuccessMessageDto, UserReturnDto } from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerEditUser
   * @summary Edit user
   * @request PUT:/api/users/edit
   */
  usersControllerEditUser = (data: EditUserDto, params: RequestParams = {}) =>
    this.request<UserReturnDto, any>({
      path: `/api/users/edit`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerDeleteUser
   * @summary Delete user
   * @request DELETE:/api/users/delete/{id}
   */
  usersControllerDeleteUser = (id: number, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/users/delete/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
}
