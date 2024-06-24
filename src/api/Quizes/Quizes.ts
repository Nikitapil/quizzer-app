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
  AllQuizesReturnDto,
  CategoryCountReturnDto,
  CorrectAnswerReturnDto,
  CreateQuizDto,
  EditQuizDto,
  GenerateQuizDto,
  GetAllQuizesDto,
  PlayQuizDto,
  QuizCategoriesReturnDto,
  RateQuizDto,
  ReturnGeneratedQuizDto,
  SingleQuizReturnDto,
  SuccessMessageDto
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class QuizesApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Quizes
   * @name GenerateQuiz
   * @summary generate quiz from opentdb
   * @request POST:/api/quizes/generate
   */
  generateQuiz = (data: GenerateQuizDto, params: RequestParams = {}) =>
    this.request<ReturnGeneratedQuizDto, any>({
      path: `/api/quizes/generate`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name CreateQuiz
   * @summary create new quiz by user
   * @request POST:/api/quizes/create
   */
  createQuiz = (data: CreateQuizDto, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/create`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetAllQuizes
   * @summary Get all available quizes
   * @request POST:/api/quizes/all
   */
  getAllQuizes = (data: GetAllQuizesDto, params: RequestParams = {}) =>
    this.request<AllQuizesReturnDto, any>({
      path: `/api/quizes/all`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetQuiz
   * @summary Get single quiz
   * @request GET:/api/quizes/quiz/{id}
   */
  getQuiz = (id: string, params: RequestParams = {}) =>
    this.request<SingleQuizReturnDto, any>({
      path: `/api/quizes/quiz/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name DeleteQuiz
   * @summary delete quiz
   * @request DELETE:/api/quizes/quiz/{id}
   */
  deleteQuiz = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/quiz/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetPlayQuiz
   * @summary Get quiz for play
   * @request GET:/api/quizes/play/{id}
   */
  getPlayQuiz = (id: string, params: RequestParams = {}) =>
    this.request<PlayQuizDto, any>({
      path: `/api/quizes/play/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetCorrectAnswer
   * @summary Get correct answer for question
   * @request GET:/api/quizes/question/{id}
   */
  getCorrectAnswer = (id: string, params: RequestParams = {}) =>
    this.request<CorrectAnswerReturnDto, any>({
      path: `/api/quizes/question/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetCategories
   * @summary Get available quiz categories
   * @request GET:/api/quizes/categories
   */
  getCategories = (params: RequestParams = {}) =>
    this.request<QuizCategoriesReturnDto[], any>({
      path: `/api/quizes/categories`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetCategoriesQuestionCount
   * @summary Get category questions count
   * @request GET:/api/quizes/categories/count/{id}
   */
  getCategoriesQuestionCount = (id: string, params: RequestParams = {}) =>
    this.request<CategoryCountReturnDto, any>({
      path: `/api/quizes/categories/count/${id}`,
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetQuizesByUser
   * @summary Get user quizes
   * @request POST:/api/quizes/user/{id}
   */
  getQuizesByUser = (id: number, data: GetAllQuizesDto, params: RequestParams = {}) =>
    this.request<AllQuizesReturnDto, any>({
      path: `/api/quizes/user/${id}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name EditQuiz
   * @summary edit quiz
   * @request PUT:/api/quizes/edit
   */
  editQuiz = (data: EditQuizDto, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/edit`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name RateQuiz
   * @summary rate quiz
   * @request POST:/api/quizes/rate
   */
  rateQuiz = (data: RateQuizDto, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/rate`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name GetFavouritesQuizes
   * @summary Get all quizes from favourites
   * @request POST:/api/quizes/favourite
   */
  getFavouritesQuizes = (data: GetAllQuizesDto, params: RequestParams = {}) =>
    this.request<AllQuizesReturnDto, any>({
      path: `/api/quizes/favourite`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name AddQuizToFavourites
   * @summary Add quiz to favourites
   * @request POST:/api/quizes/favourite/{id}
   */
  addQuizToFavourites = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/favourite/${id}`,
      method: 'POST',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quizes
   * @name RemoveQuizFromFavourites
   * @summary Remove quiz from favourites
   * @request DELETE:/api/quizes/favourite/{id}
   */
  removeQuizFromFavourites = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/favourite/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
}
