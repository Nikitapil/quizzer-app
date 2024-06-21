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

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Quizes
   * @name QuizesControllerGenerateQuiz
   * @summary generate quiz from opentdb
   * @request POST:/api/quizes/generate
   */
  quizesControllerGenerateQuiz = (data: GenerateQuizDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerCreateQuiz
   * @summary create new quiz by user
   * @request POST:/api/quizes/create
   */
  quizesControllerCreateQuiz = (data: CreateQuizDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetAllQuizes
   * @summary Get all available quizes
   * @request POST:/api/quizes/all
   */
  quizesControllerGetAllQuizes = (data: GetAllQuizesDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetQuiz
   * @summary Get single quiz
   * @request GET:/api/quizes/quiz/{id}
   */
  quizesControllerGetQuiz = (id: string, params: RequestParams = {}) =>
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
   * @name QuizesControllerDeleteQuiz
   * @summary delete quiz
   * @request DELETE:/api/quizes/quiz/{id}
   */
  quizesControllerDeleteQuiz = (id: string, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetPlayQuiz
   * @summary Get quiz for play
   * @request GET:/api/quizes/play/{id}
   */
  quizesControllerGetPlayQuiz = (id: string, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetCorrectAnswer
   * @summary Get correct answer for question
   * @request GET:/api/quizes/question/{id}
   */
  quizesControllerGetCorrectAnswer = (id: string, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetCategories
   * @summary Get available quiz categories
   * @request GET:/api/quizes/categories
   */
  quizesControllerGetCategories = (params: RequestParams = {}) =>
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
   * @name QuizesControllerGetCategoriesQuestionCount
   * @summary Get category questions count
   * @request GET:/api/quizes/categories/count/{id}
   */
  quizesControllerGetCategoriesQuestionCount = (id: string, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetQuizesByUser
   * @summary Get user quizes
   * @request POST:/api/quizes/user/{id}
   */
  quizesControllerGetQuizesByUser = (id: number, data: GetAllQuizesDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerEditQuiz
   * @summary edit quiz
   * @request PUT:/api/quizes/edit
   */
  quizesControllerEditQuiz = (data: EditQuizDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerRateQuiz
   * @summary rate quiz
   * @request POST:/api/quizes/rate
   */
  quizesControllerRateQuiz = (data: RateQuizDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerGetFavouritesQuizes
   * @summary Get all quizes from favourites
   * @request POST:/api/quizes/favourite
   */
  quizesControllerGetFavouritesQuizes = (data: GetAllQuizesDto, params: RequestParams = {}) =>
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
   * @name QuizesControllerAddQuizToFavourites
   * @summary Add quiz to favourites
   * @request POST:/api/quizes/favourite/{id}
   */
  quizesControllerAddQuizToFavourites = (id: string, params: RequestParams = {}) =>
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
   * @name QuizesControllerRemoveQuizFromFavourites
   * @summary Remove quiz from favourites
   * @request DELETE:/api/quizes/favourite/{id}
   */
  quizesControllerRemoveQuizFromFavourites = (id: string, params: RequestParams = {}) =>
    this.request<SuccessMessageDto, any>({
      path: `/api/quizes/favourite/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params
    });
}
