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

export enum QuizDifficultiesEnum {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export enum QuizQuestionTypeEnum {
  Multiple = 'multiple',
  Boolean = 'boolean'
}

export interface GenerateQuizDto {
  /** amount of questions */
  amount: number;
  /** category of questions */
  category?: number;
  /** difficulty of questions */
  difficulty?: QuizDifficultiesEnum;
  /** type of questions */
  type?: QuizQuestionTypeEnum;
}

export interface ReturnGeneratedQuizDto {
  /** quiz id */
  id: string;
}

export interface CreateQuizQuestionDto {
  /** question */
  question: string;
  /** correct answer */
  correctAnswer: string;
  /** incorrect answers */
  incorrectAnswers: string[];
}

export interface CreateQuizDto {
  /** Quiz name */
  name: string;
  /** Quiz privacy */
  isPrivate: boolean;
  /** Quiz questions */
  questions: CreateQuizQuestionDto[];
}

export interface SuccessMessageDto {
  /**
   * message about success in some operations
   * @example "success"
   */
  message: string;
}

export interface GetAllQuizesDto {
  /** page number */
  page: number;
  /** limit per page */
  limit: number;
  /** search string */
  search: string;
}

export interface QuizDto {
  /** quiz id */
  id: string;
  /** created date */
  createdAt: string;
  /** updated date */
  updatedAt: string;
  /** quiz name */
  name: string;
  /** quiz privacy */
  isPrivate: boolean;
  /** created date */
  userId: number | null;
  /** is quiz in users favourites */
  isInFavourites: boolean;
  /** count of quiz questions */
  questionsCount: number;
  /** author */
  author: string | null;
  /** quiz rating */
  rating: number | null;
}

export interface AllQuizesReturnDto {
  /** quizes array */
  quizes: QuizDto[];
  /** quizes total count */
  totalCount: number;
}

export interface QuizQuestionReturnDto {
  /** question id */
  id: string;
  /** question created at */
  createdAt: string;
  /** question updated at */
  updatedAt: string;
  /** question */
  question: string;
  /** question correct answer */
  correctAnswer: string;
  /** question incorrect answers */
  incorrectAnswers: string[];
  /** quiz id */
  quizId: string;
}

export interface SingleQuizReturnDto {
  /** quiz rating */
  rating?: number;
  /** quiz id */
  id: string;
  /** quiz created date */
  createdAt: string;
  /** quiz updated date */
  updatedAt: string;
  /** quiz name */
  name: string;
  /** quiz created date */
  isPrivate: boolean;
  /** quiz author id */
  userId: number;
  /** quiz questions */
  questions: QuizQuestionReturnDto[];
  /** is Quiz in favourites by current user */
  isInFavourites: boolean;
  /** is Quiz in favourites by current user */
  isGenerated: boolean;
}

export interface PlayQuestionDto {
  /** question id */
  id: string;
  /** question */
  question: string;
  /** question answers */
  answers: string[];
}

export interface PlayQuizDto {
  /** quiz id */
  id: string;
  /** quiz name */
  name: string;
  /** quiz privacy */
  isPrivate: boolean;
  /** is Quiz generated or created by user */
  isGenerated: boolean;
  /** quiz questions */
  questions: PlayQuestionDto[];
  /** is Quiz in favourites by current user */
  isInFavourites: boolean;
}

export interface CorrectAnswerReturnDto {
  /** answer */
  answer: string;
}

export interface QuizCategoriesReturnDto {
  /** category id */
  id: number;
  /** category name */
  name: string;
}

export interface CategoryCountReturnDto {
  /** Total questions count */
  total_question_count: number;
  /** easy questions count */
  total_easy_question_count: number;
  /** medium questions count */
  total_medium_question_count: number;
  /** hard questions count */
  total_hard_question_count: number;
}

export interface EditQuizDto {
  /** Quiz name */
  name: string;
  /** Quiz privacy */
  isPrivate: boolean;
  /** Quiz questions */
  questions: CreateQuizQuestionDto[];
  /** quiz id */
  id: string;
}

export interface RateQuizDto {
  /** quizId */
  quizId: string;
  /** rating */
  rating: number;
}
