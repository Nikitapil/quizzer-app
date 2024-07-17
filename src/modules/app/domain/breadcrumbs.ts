import { ERoutesNames } from '@/router/routes-names';

export const BREADCRUMBS = {
  MAIN: {
    title: 'main',
    routeName: ERoutesNames.HOME
  },
  GAME: {
    title: 'play_quiz',
    routeName: ERoutesNames.QUIZ
  },
  ERROR: {
    title: 'error_page',
    routeName: ERoutesNames.ERROR
  },
  ALL_QUIZZES: {
    title: 'all_quizzes',
    routeName: ERoutesNames.ALL_QUIZES
  },
  USER_QUIZZES: {
    title: 'user_quizzes',
    routeName: ERoutesNames.USER_QUIZES
  },
  MY_QUIZZES: {
    title: 'my_quizzes',
    routeName: ERoutesNames.USER_QUIZES
  },
  FAVOURITES: {
    title: 'favourites',
    routeName: ERoutesNames.FAVOURITES
  },
  CREATE: {
    title: 'quiz_creation',
    routeName: ERoutesNames.CREATE_QUIZ
  },
  EDIT: {
    title: 'quiz_editing',
    routeName: ERoutesNames.EDIT_QUIZ
  },
  PROFILE: {
    title: 'profile',
    routeName: ERoutesNames.PROFILE
  },
  SIGN_IN: {
    title: 'sign_in',
    routeName: ERoutesNames.SIGN_IN
  },
  SIGN_UP: {
    title: 'sign_up',
    routeName: ERoutesNames.SIGN_UP
  }
};
