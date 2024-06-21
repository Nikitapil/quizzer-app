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

export interface EditUserDto {
  /**
   * user email
   * @example "test@test.tes"
   */
  email?: string;
  /**
   * user password
   * @example "12345678"
   */
  password?: string;
  /**
   * username
   * @example "Nick"
   */
  username?: string;
}

export enum UserRolesEnum {
  User = 'User',
  Admin = 'Admin'
}

export interface UserReturnDto {
  /**
   * User Id
   * @example 1
   */
  id: number;
  /**
   * User email
   * @example "test@test.test"
   */
  email: string;
  /**
   * username
   * @example "Test user"
   */
  username: string;
  /**
   * user role
   * @example "User"
   */
  role: UserRolesEnum;
}

export interface SuccessMessageDto {
  /**
   * message about success in some operations
   * @example "success"
   */
  message: string;
}
