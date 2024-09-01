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
  AddQuizCommentDto,
  EditQuizCommentDto,
  GetQuizCommentsParams,
  ManyCommentsReturnDto,
  QuizCommentReturnDto,
  SuccessMessageDto
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class QuizCommentsApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name CreateQuizComment
   * @summary Add comment quiz
   * @request POST:/api/quiz-comments
   */
  createQuizComment = (data: AddQuizCommentDto, params: RequestParams = {}) =>
    this.request<QuizCommentReturnDto, any>({
      path: `/api/quiz-comments`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name EditQuizComment
   * @summary Edit comment quiz
   * @request PUT:/api/quiz-comments
   */
  editQuizComment = (data: EditQuizCommentDto, params: RequestParams = {}) =>
    this.request<QuizCommentReturnDto, any>({
      path: `/api/quiz-comments`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name GetQuizComments
   * @summary get quizComments
   * @request GET:/api/quiz-comments
   */
  getQuizComments = (query: GetQuizCommentsParams, params: RequestParams = {}) =>
    this.request<ManyCommentsReturnDto, any>({
      path: `/api/quiz-comments`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @name DeleteQuizComment
   * @summary Delete comment quiz
   * @request DELETE:/api/quiz-comments/{id}
   */
  deleteQuizComment = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quiz-comments/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
}
